import { prisma } from '@/lib/prisma'
import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook, WebhookRequiredHeaders } from 'svix'

const webhookSecret = process.env.CLERK_WEBHHOK_SECRET || ''

type EventType = 'user.created' | 'user.updated' | '*'
type EmailAddressType = {
  id: string
  email_address: string
}
type EventDataType = {
  id: string
  first_name: string
  last_name: string
  email_addresses: EmailAddressType[]
  primary_email_address_id: string
  attributes: Record<string, string | number>
}
type Event = {
  data: EventDataType
  object: 'event'
  type: EventType
}

const handler = async (request: Request) => {
  const payload = await request.json()
  const headerList = headers()
  const heads = {
    'svix-id': headerList.get('svix-id'),
    'svix-timestamp': headerList.get('svix-timestamp'),
    'svix-signature': headerList.get('svix-signature'),
  }
  const webhook = new Webhook(webhookSecret)
  let event: Event | null = null
  try {
    event = webhook.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event
  } catch (error) {
    console.log('WEB_HOOK_ERROR', (error as Error).message)
    return NextResponse.json({}, { status: 400 })
  }
  const eventType: EventType = event.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses } = event.data
    await prisma.user.upsert({
      where: {
        external_id: id as string,
      },
      create: {
        external_id: id as string,
        first_name,
        last_name,
        email_addresses: email_addresses[0].email_address,
      },
      update: {
        first_name,
        last_name,
        email_addresses: email_addresses[0].email_address,
      },
    })
  }
  return NextResponse.json({}, { status: 200 })
}

export const GET = handler
export const POST = handler
export const PUT = handler

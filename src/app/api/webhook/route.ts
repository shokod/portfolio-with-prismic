import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received webhook:', body);

    // Revalidate the "prismic" tag
    revalidateTag("prismic");

    // Trigger Vercel deployment
    const vercelDeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_wWw2Ipsy60OQBDdFZ8mZgJQyFqp5/rsG55b8xYf';
    const deployResponse = await fetch(vercelDeployHook, { method: 'POST' });

    if (!deployResponse.ok) {
      throw new Error(`Failed to trigger deployment: ${deployResponse.statusText}`);
    }

    return NextResponse.json({ revalidated: true, deployed: true, now: Date.now() });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}


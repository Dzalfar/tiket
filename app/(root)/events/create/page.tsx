import EventForm from '@/components/ui/shared/eventform'
import { auth } from '@clerk/nextjs/server'

import React from 'react'



const createEvent = async () => {
    const authResult = await auth();
    const {sessionClaims} = authResult;

    const userId = sessionClaims?.userId as string;

  return (
    <div>
        <div className=' bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
          <h3 className=' wrapper text-center sm:text-left'></h3>
          </div>
          
          <div className=' wrapper my-8'>
              <EventForm userId = {userId} type = "Create"/>
          </div>
    </div>
  )
}

export default createEvent
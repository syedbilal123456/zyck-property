import { prisma } from '@/lib/prisma'
import React from 'react'
import Addform from './_components/Form'

const AddPropertyForm = async () => {
    const [PropertyTypes, propertyStatus, propertyTypeDetail, cities, states  ] = await Promise.all([
        await prisma.propertyType.findMany(),
        await prisma.propertyStatus.findMany(),
        await prisma.propertyTypeDetail.findMany(),
        await prisma.city.findMany(),
        await prisma.state.findMany(),
    ])
  return (
    <div>
        <Addform city={cities} details={propertyTypeDetail} state={states} statuses={propertyStatus} types={PropertyTypes}/>
    </div>
  )
}

export default AddPropertyForm

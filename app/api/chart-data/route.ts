import { NextResponse } from "next/server"

const beaKey = process.env.BEA_API_KEY


export async function POST(req: Request) {
  const { tableName, lineCode, geoFips } = await req.json()
  
  const Year = 'LAST10'
  
  const URL = `https://apps.bea.gov/api/data/?&UserID=${beaKey}&method=GetData&datasetname=Regional&TableName=${tableName}&LineCode=${lineCode}&GeoFIPS=${geoFips}&Year=${Year}&ResultFormat=JSON`;

  try {
    const res = await fetch(URL)

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json()

    // check for API errors
    if (data.BEAAPI.Results.Error) {
      return NextResponse.json({
        status: 429,
        message: data.BEAAPI.Results.Error
      })
    }

    // happy path
    return NextResponse.json({ status: 200, ...data })

  } catch (error: any) {
    // default errors
    return NextResponse.json({ success: false, message: error.message })
  }
}
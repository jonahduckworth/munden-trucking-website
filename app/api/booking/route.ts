import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const { name, email, phone, serviceType, vehicleInfo, date, timeSlot } = body
    
    if (!name || !email || !phone || !serviceType || !vehicleInfo || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email to customer
    // 3. Send notification to staff
    // 4. Integrate with calendar system
    
    // For now, we'll just log and return success
    console.log("New booking received:", {
      name,
      email,
      phone,
      companyName: body.companyName || "N/A",
      serviceType,
      vehicleInfo,
      date,
      timeSlot,
      notes: body.notes || "No additional notes",
      submittedAt: new Date().toISOString()
    })
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({
      success: true,
      message: "Booking received successfully",
      bookingId: `BOOK-${Date.now()}`,
    })
    
  } catch (error) {
    console.error("Booking submission error:", error)
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    )
  }
}
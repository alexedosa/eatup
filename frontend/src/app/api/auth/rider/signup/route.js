import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
    // In a real app, you'd save to DB here
    console.log("New Rider Signup:", body);

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: "Rider signed up successfully",
      user: { name: body.name, role: "rider" } 
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Server error during signup" 
    }, { status: 500 });
  }
}

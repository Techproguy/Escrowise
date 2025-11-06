import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAuth } from "@/lib/auth"; // Assuming you have user auth

export async function POST(request: NextRequest) {
  try {
    // Require user to be authenticated
    const auth = await requireAuth();
    if (auth instanceof NextResponse) return auth;

    const { accountType, personalDetails, idDocument, addressDocument } = await request.json();

    // Save verification data to user_profiles or a new table
    const { data, error } = await supabaseAdmin
      .from("user_profiles")
      .update({
        verification_status: "pending",
        account_type: accountType,
        first_name: personalDetails.firstName,
        middle_name: personalDetails.middleName,
        last_name: personalDetails.lastName,
        date_of_birth: personalDetails.dateOfBirth,
        address: personalDetails.address,
        city: personalDetails.city,
        state: personalDetails.state,
        zip_code: personalDetails.zipCode,
        country: personalDetails.country,
        phone_number: personalDetails.phoneNumber,
        // Store document info, perhaps in a verification_documents table
      })
      .eq("id", auth.user.id);

    if (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    // Notify admins via email or dashboard
    // await notifyAdmins("New verification submitted", `User ${auth.user.id} submitted verification`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Verification submit error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
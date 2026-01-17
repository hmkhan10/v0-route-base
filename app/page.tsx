"use client"
import Link from "next/link"
import { getMerchant, getEcommerceMetrics } from "@/lib/mock-data"
import { EcommerceDashboard } from "@/components/ecommerce-dashboard"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PageTransition } from "@/components/page-transition"

export default function HomePage() {
  // Using TechFlow (Ecommerce-Pro merchant) for the dashboard preview
  const merchant = getMerchant("techflow")!
  const metrics = getEcommerceMetrics(merchant.id)

  return (
    <div className="min-h-screen bg-[#0A0C10] flex">
      <DashboardSidebar merchantSlug="techflow" planType={merchant.planType} businessName={merchant.businessName} />

      <main className="ml-72 flex-1 p-10">
        <PageTransition>
          <EcommerceDashboard merchant={merchant} metrics={metrics} />
        </PageTransition>
      </main>

      {/* Hero Section */}
      {/* Display the Ecommerce Pro dashboard directly on homepage for preview */}
      {/* Removed the Hero Section as it's no longer needed */}

      {/* Features Section */}
      {/* Display the Ecommerce Pro dashboard directly on homepage for preview */}
      {/* Removed the Features Section as it's no longer needed */}

      {/* CTA Section */}
      {/* Display the Ecommerce Pro dashboard directly on homepage for preview */}
      {/* Removed the CTA Section as it's no longer needed */}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground text-sm">© 2025 RouteBase. All rights reserved.</div>
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

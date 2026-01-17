"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RouteBaseLogo } from "./routebase-logo"
import { cn } from "@/lib/utils"
import type { PlanType } from "@/lib/types"
import { showDashboard } from "@/lib/mock-data"
import { LayoutDashboard, History, Settings, ExternalLink, LogOut, ChevronRight } from "lucide-react"

interface DashboardSidebarProps {
  merchantSlug: string
  planType: PlanType
  businessName: string
}

export function DashboardSidebar({ merchantSlug, planType, businessName }: DashboardSidebarProps) {
  const pathname = usePathname()
  const hasDashboard = showDashboard(planType)

  const navItems = [
    ...(hasDashboard
      ? [
          {
            label: "Intelligence",
            href: `/${merchantSlug}/dashboard`,
            icon: LayoutDashboard,
          },
        ]
      : []),
    {
      label: "Transactions",
      href: `/${merchantSlug}/transactions`,
      icon: History,
    },
    {
      label: "Settings",
      href: `/${merchantSlug}/settings`,
      icon: Settings,
    },
  ]

  return (
    <aside className="w-72 glass fixed h-full z-50 flex flex-col">
      <div className="p-8">
        <RouteBaseLogo size="sm" />
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
            {planType}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 py-4 px-5 rounded-xl transition-all group",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400"
                  : "opacity-60 hover:opacity-100 hover:bg-white/5",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          )
        })}

        <Link
          href={`/${merchantSlug}`}
          target="_blank"
          className="flex items-center gap-4 py-4 px-5 rounded-xl transition-all opacity-60 hover:opacity-100 hover:bg-white/5"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="font-bold flex-1">View Checkout</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-xl p-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Merchant</p>
          <p className="font-bold truncate">{businessName}</p>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all opacity-60 hover:opacity-100 hover:bg-white/5 text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-bold text-sm">Sign Out</span>
        </Link>
      </div>
    </aside>
  )
}

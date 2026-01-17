"use client"

import { use, useState } from "react"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { getMerchant, showDashboard } from "@/lib/mock-data"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageTransition } from "@/components/page-transition"
import { Building, Mail, Phone, Globe, Palette, Save, CreditCard, Shield } from "lucide-react"

interface SettingsPageProps {
  params: Promise<{ merchant_slug: string }>
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { merchant_slug } = use(params)
  const merchant = getMerchant(merchant_slug)
  const [isSaving, setIsSaving] = useState(false)

  if (!merchant) {
    notFound()
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] flex">
      <DashboardSidebar
        merchantSlug={merchant_slug}
        planType={merchant.planType}
        businessName={merchant.businessName}
      />

      <main className="ml-72 flex-1 p-10">
        <PageTransition>
          <div className="space-y-8 max-w-3xl">
            {/* Header */}
            <header>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black uppercase tracking-tight"
              >
                Settings
              </motion.h1>
              <p className="text-muted-foreground mt-1">Manage your terminal configuration</p>
            </header>

            {/* Business Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard className="p-8 rounded-2xl">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Building className="w-5 h-5 text-emerald-400" />
                  Business Information
                </h2>

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Business Name
                      </Label>
                      <Input
                        defaultValue={merchant.businessName}
                        className="py-5 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        URL Slug
                      </Label>
                      <Input
                        defaultValue={merchant.slug}
                        className="py-5 bg-white/5 border-white/10 rounded-xl font-mono"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Business Description
                    </Label>
                    <Input defaultValue={merchant.description} className="py-5 bg-white/5 border-white/10 rounded-xl" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Mail className="w-3 h-3 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        type="email"
                        defaultValue={merchant.email}
                        className="py-5 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Phone className="w-3 h-3 inline mr-2" />
                        Phone
                      </Label>
                      <Input
                        type="tel"
                        defaultValue={merchant.phone}
                        className="py-5 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Globe className="w-3 h-3 inline mr-2" />
                      Website URL
                    </Label>
                    <Input
                      type="url"
                      defaultValue={merchant.websiteUrl}
                      className="py-5 bg-white/5 border-white/10 rounded-xl"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Branding */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <GlassCard className="p-8 rounded-2xl">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Palette className="w-5 h-5 text-blue-400" />
                  Branding
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Brand Color
                    </Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl border border-white/10"
                        style={{ backgroundColor: merchant.brandColor }}
                      />
                      <Input
                        type="text"
                        defaultValue={merchant.brandColor}
                        className="py-5 bg-white/5 border-white/10 rounded-xl font-mono flex-1 max-w-40"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-sm text-muted-foreground">
                      Your brand color is used on your checkout page header and call-to-action buttons.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Plan Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <GlassCard className="p-8 rounded-2xl">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  Subscription Plan
                </h2>

                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Current Plan</span>
                    <h3 className="text-2xl font-black mt-1">{merchant.planType}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {showDashboard(merchant.planType)
                        ? "Full dashboard access enabled"
                        : "Upgrade for dashboard access"}
                    </p>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600 font-bold uppercase tracking-widest text-xs">
                    Upgrade Plan
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <GlassCard className="p-8 rounded-2xl">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Security
                </h2>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 py-5 rounded-xl bg-transparent"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 py-5 rounded-xl bg-transparent"
                  >
                    Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 py-5 rounded-xl text-destructive hover:bg-destructive/10 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Save Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </PageTransition>
      </main>
    </div>
  )
}

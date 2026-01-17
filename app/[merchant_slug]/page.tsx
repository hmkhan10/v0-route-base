"use client"

import type React from "react"

import { use, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { getMerchant, getMerchantProducts } from "@/lib/mock-data"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CheckoutItem } from "@/lib/types"
import {
  ShoppingBag,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Minus,
  Plus,
  Trash2,
} from "lucide-react"

interface CheckoutPageProps {
  params: Promise<{ merchant_slug: string }>
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { merchant_slug } = use(params)
  const router = useRouter()
  const merchant = getMerchant(merchant_slug)
  const products = getMerchantProducts(merchant_slug)

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [cart, setCart] = useState<CheckoutItem[]>(
    products.slice(0, 2).map((p) => ({ productId: p.id, name: p.name, price: p.price, quantity: 1 })),
  )

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  if (!merchant) {
    return null
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = Math.max(0, item.quantity + delta)
            return { ...item, quantity: newQty }
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  // Dynamic brand color
  const brandColor = merchant.brandColor || "#10B981"

  return (
    <div className="min-h-screen bg-[#0A0C10] mesh-gradient flex items-center justify-center p-4 md:p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard variant="elevated" className="p-10 rounded-3xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>

                <h2 className="text-2xl font-black mb-2">Payment Successful</h2>
                <p className="text-muted-foreground mb-8">Your transaction has been completed</p>

                <GlassCard className="p-6 rounded-xl text-left space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono font-bold">#RB-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Merchant</span>
                    <span className="font-bold">{merchant.businessName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-bold">{totalQuantity} Units</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <span className="font-bold">Total Paid</span>
                    <span className="text-xl font-black text-emerald-400">PKR {totalAmount.toLocaleString()}</span>
                  </div>
                </GlassCard>

                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="w-full py-6 border-white/10 rounded-xl font-bold uppercase tracking-widest"
                >
                  Download Receipt
                </Button>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Merchant Header with Dynamic Branding */}
              <div
                className="rounded-t-3xl p-6 text-center"
                style={{ backgroundColor: `${brandColor}20`, borderBottom: `1px solid ${brandColor}40` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: brandColor }}
                >
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: brandColor }}>
                  Paying To
                </p>
                <h1 className="text-2xl font-black tracking-tight">{merchant.businessName}</h1>
                {merchant.description && <p className="text-muted-foreground text-sm mt-1">{merchant.description}</p>}
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-4 py-6 bg-white/[0.02]">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all`}
                      style={{
                        backgroundColor: s <= step ? brandColor : "rgba(255,255,255,0.05)",
                        color: s <= step ? "black" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        s <= step ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s === 1 ? "Info" : "Pay"}
                    </span>
                    {s < 2 && (
                      <div
                        className="w-8 h-0.5 transition-all"
                        style={{ backgroundColor: s < step ? brandColor : "rgba(255,255,255,0.1)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <GlassCard className="mx-4 mb-4 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Order Summary
                  </span>
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                  >
                    {totalQuantity} Units
                  </span>
                </div>

                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-sm font-medium truncate flex-1">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-6 h-6 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3 h-3 text-destructive" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-6 h-6 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-bold text-sm">Total</span>
                  <span className="text-xl font-black" style={{ color: brandColor }}>
                    PKR {totalAmount.toLocaleString()}
                  </span>
                </div>
              </GlassCard>

              {/* Form Section */}
              <GlassCard variant="elevated" className="mx-4 p-6 rounded-b-3xl rounded-t-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-5"
                      >
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="text"
                              placeholder="Your full name"
                              value={customerInfo.name}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                              className="pl-11 py-5 bg-white/5 border-white/10 rounded-xl"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              className="pl-11 py-5 bg-white/5 border-white/10 rounded-xl"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="03XX XXXXXXX"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                              className="pl-11 py-5 bg-white/5 border-white/10 rounded-xl"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-5"
                      >
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Payment Method
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Raast", "JazzCash", "EasyPaisa", "Bank"].map((method) => (
                              <button
                                key={method}
                                type="button"
                                className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-bold focus:ring-2"
                                style={{ "--tw-ring-color": brandColor } as React.CSSProperties}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Account / Mobile Number
                          </Label>
                          <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="text"
                              placeholder="03XX XXXXXXX or IBAN"
                              className="pl-11 py-5 bg-white/5 border-white/10 rounded-xl"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 pt-2">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 py-5 border-white/10 rounded-xl font-bold uppercase tracking-widest"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={isProcessing || cart.length === 0}
                      className="flex-1 py-5 rounded-xl font-bold uppercase tracking-widest shadow-lg group"
                      style={{
                        backgroundColor: brandColor,
                        boxShadow: `0 10px 40px -10px ${brandColor}50`,
                      }}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : step === 1 ? (
                        <span className="flex items-center gap-2">
                          Continue to Pay
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      ) : (
                        `Pay PKR ${totalAmount.toLocaleString()}`
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secured by RouteBase</span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

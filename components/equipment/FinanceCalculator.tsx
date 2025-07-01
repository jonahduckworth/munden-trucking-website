"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Calculator, Info, FileText } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FinanceCalculatorProps {
  equipmentPrice?: number
  equipmentName?: string
}

const FinanceCalculator = ({ equipmentPrice = 250000, equipmentName = "Equipment" }: FinanceCalculatorProps) => {
  const [price, setPrice] = useState(equipmentPrice)
  const [downPayment, setDownPayment] = useState(equipmentPrice * 0.2)
  const [interestRate, setInterestRate] = useState(6.5)
  const [term, setTerm] = useState(60) // months
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = price - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = term
    
    if (monthlyRate === 0) {
      return principal / numPayments
    }
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    return monthlyPayment
  }
  
  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = (monthlyPayment * term) + downPayment
  const totalInterest = totalPayment - price
  const downPaymentPercentage = (downPayment / price) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Equipment Finance Calculator
          </CardTitle>
          <CardDescription>
            Estimate your monthly payments for {equipmentName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Equipment Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Equipment Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-10"
                min={0}
                step={1000}
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="downPayment">Down Payment</Label>
              <span className="text-sm text-muted-foreground">
                {downPaymentPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="pl-10"
                min={0}
                max={price}
                step={1000}
              />
            </div>
            <Slider
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              min={0}
              max={price}
              step={1000}
              className="mt-2"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Annual interest rate. Rates vary based on credit.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0}
              max={20}
              step={0.1}
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <Label htmlFor="term">Loan Term</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[term]}
                onValueChange={(value) => setTerm(value[0])}
                min={12}
                max={84}
                step={12}
                className="flex-1"
              />
              <span className="text-sm font-medium w-20">
                {term} months
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>7 years</span>
            </div>
          </div>

          {/* Results */}
          <div className="border-t pt-6 space-y-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Loan Amount</p>
                <p className="font-medium">{formatCurrency(price - downPayment)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-medium">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Payment</p>
                <p className="font-medium">{formatCurrency(totalPayment)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Period</p>
                <p className="font-medium">{term / 12} years</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1" asChild>
              <a href="/quote">
                <FileText className="mr-2 h-4 w-4" />
                Get Financing Quote
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="/contact">Contact Finance Team</a>
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            * This calculator provides estimates only. Actual payments may vary based on 
            credit approval, fees, and other factors. Contact us for a detailed quote.
          </p>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default FinanceCalculator
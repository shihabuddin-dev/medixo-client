import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Shield, 
  User, 
  Store, 
  CreditCard,
  Truck,
  Heart,
  Mail,
  Smartphone,
  Lock,
  Globe,
  BookOpen,
  HelpCircle,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from 'next/link';

const TermsOfService = () => {
  const effectiveDate = "February 15, 2026";
  const version = "4.2";
  
  const sections = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      icon: <Scale className="h-5 w-5" />,
      content: `By accessing or using PharmaConnect, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.`,
      subPoints: [
        "These terms constitute a legally binding agreement",
        "Apply to all users: patients, pharmacies, healthcare providers",
        "Include our Privacy Policy, Cookie Policy, and other guidelines",
        "May be updated periodically with notice provided"
      ]
    },
    {
      id: "eligibility",
      title: "2. Eligibility & Registration",
      icon: <User className="h-5 w-5" />,
      content: `To use our services, you must meet certain eligibility criteria:`,
      subPoints: [
        "Minimum age: 18 years (or parental consent required)",
        "Valid government-issued identification",
        "Accurate and complete registration information",
        "No previous termination or suspension of account",
        "Compliance with local pharmaceutical regulations"
      ],
      warning: "Users under 18 require parent/guardian supervision"
    },
    {
      id: "accounts",
      title: "3. User Accounts & Security",
      icon: <Lock className="h-5 w-5" />,
      content: `You are responsible for maintaining the security of your account:`,
      subPoints: [
        "Keep login credentials confidential",
        "Notify us immediately of unauthorized access",
        "Provide accurate and current information",
        "One account per individual/organization",
        "No sharing or transferring accounts"
      ]
    },
    {
      id: "platform-use",
      title: "4. Acceptable Use of Platform",
      icon: <CheckCircle className="h-5 w-5" />,
      content: `Users must adhere to the following acceptable use policies:`,
      dos: [
        "Use platform for legitimate pharmaceutical purposes",
        "Provide accurate prescription information",
        "Maintain respectful communication",
        "Comply with all applicable laws",
        "Report suspicious activities"
      ],
      donts: [
        "No fraudulent prescriptions or misrepresentation",
        "No resale of medications for profit",
        "No harassment or inappropriate content",
        "No reverse engineering or data scraping",
        "No unauthorized commercial use"
      ]
    },
    {
      id: "pharmacies",
      title: "5. Pharmacy Responsibilities",
      icon: <Store className="h-5 w-5" />,
      content: `Registered pharmacies must comply with additional requirements:`,
      subPoints: [
        "Valid pharmacy license and DEA registration",
        "Accurate inventory and pricing information",
        "Timely order processing and fulfillment",
        "Proper prescription verification procedures",
        "Compliance with all pharmaceutical regulations",
        "Maintain appropriate insurance coverage"
      ]
    },
    {
      id: "orders-payments",
      title: "6. Orders & Payments",
      icon: <CreditCard className="h-5 w-5" />,
      content: `Order processing and payment terms:`,
      subPoints: [
        "Prices displayed are final (including taxes)",
        "Payment required before order processing",
        "Accepted payment methods: credit/debit cards, digital wallets",
        "Order confirmation does not guarantee availability",
        "Refund policy: 30-day return for unopened products",
        "Prescription medications: no returns unless damaged"
      ]
    },
    {
      id: "prescriptions",
      title: "7. Prescription Medications",
      icon: <Heart className="h-5 w-5" />,
      content: `Specific terms regarding prescription medications:`,
      subPoints: [
        "Valid prescription from licensed healthcare provider required",
        "Prescription verification may take 24-48 hours",
        "No substitution without prescriber approval",
        "Controlled substances: additional verification required",
        "Emergency medications: expedited processing available",
        "Prescription records maintained for 10 years"
      ],
      warning: "Never share prescription medications with others"
    },
    {
      id: "delivery",
      title: "8. Delivery & Shipping",
      icon: <Truck className="h-5 w-5" />,
      content: `Delivery terms and conditions:`,
      subPoints: [
        "Standard delivery: 3-5 business days",
        "Express delivery: 1-2 business days (additional fee)",
        "Signature required for prescription medications",
        "Temperature-sensitive medications: special handling",
        "Delivery delays: notifications provided",
        "International shipping: subject to local regulations"
      ]
    },
    {
      id: "liability",
      title: "9. Limitation of Liability",
      icon: <Shield className="h-5 w-5" />,
      content: `Our liability is limited as follows:`,
      subPoints: [
        "Not liable for medication side effects or interactions",
        "Not responsible for incorrect prescription information",
        "Maximum liability: amount paid in last 6 months",
        "Not liable for third-party delivery services",
        "Not responsible for user negligence",
        "Force majeure events excluded"
      ]
    },
    {
      id: "termination",
      title: "10. Account Termination",
      icon: <XCircle className="h-5 w-5" />,
      content: `We reserve the right to terminate accounts for:`,
      subPoints: [
        "Violation of these terms",
        "Fraudulent activities",
        "Abusive behavior",
        "Non-payment",
        "Legal requirements",
        "Platform security concerns"
      ],
      note: "Terminated users may appeal within 30 days"
    },
    {
      id: "disputes",
      title: "11. Dispute Resolution",
      icon: <Scale className="h-5 w-5" />,
      content: `Dispute resolution process:`,
      subPoints: [
        "Informal resolution required before legal action",
        "30-day negotiation period",
        "Binding arbitration for unresolved disputes",
        "Venue: Delaware, United States",
        "Governing law: Delaware State Law",
        "Class action waivers apply"
      ]
    },
    {
      id: "updates",
      title: "12. Updates & Communication",
      icon: <Mail className="h-5 w-5" />,
      content: `How we communicate changes:`,
      subPoints: [
        "Email notification for significant changes",
        "In-app notifications for minor updates",
        "30-day notice for material changes",
        "Continued use constitutes acceptance",
        "Archive of previous versions available",
        "Contact: legal@pharmaconnect.com"
      ]
    }
  ];

  const quickFacts = [
    {
      icon: <Globe className="h-4 w-4" />,
      title: "Global Coverage",
      description: "Available in 50+ countries"
    },
    {
      icon: <Smartphone className="h-4 w-4" />,
      title: "Mobile Access",
      description: "iOS & Android apps available"
    },
    {
      icon: <Store className="h-4 w-4" />,
      title: "Verified Pharmacies",
      description: "5,000+ licensed partners"
    },
    {
      icon: <Heart className="h-4 w-4" />,
      title: "Patient Safety",
      description: "24/7 pharmacist support"
    }
  ];

  const prohibitedActivities = [
    "Prescription forgery or alteration",
    "Medication resale without license",
    "Price manipulation or collusion",
    "Harassment of other users",
    "Data mining or scraping",
    "Impersonation of healthcare providers"
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/5">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">
                Version {version}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Effective Date: {effectiveDate}
              </p>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Terms of <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Service</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Legal agreement governing your use of the PharmaConnect pharmaceutical marketplace platform
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Read Summary
            </Button>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Download PDF
            </Button>
            <Link href="#contact">
              <Button variant="ghost" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickFacts.map((fact) => (
            <div 
              key={fact.title}
              className="p-4 rounded-xl border bg-linear-to-br from-card to-card/80 text-center"
            >
              <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-3">
                {fact.icon}
              </div>
              <h3 className="font-semibold mb-1">{fact.title}</h3>
              <p className="text-xs text-muted-foreground">{fact.description}</p>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="border-destructive/30 bg-destructive/5 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">Important Legal Notice</h3>
                <p className="text-sm text-muted-foreground">
                  This is a binding legal agreement. By using PharmaConnect, you acknowledge that you have read, 
                  understood, and agree to all terms. Consult with legal counsel if you have questions about these terms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sections.map((section) => (
                <a 
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      {section.icon}
                    </div>
                    <span className="text-sm font-medium">{section.title.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <Card 
              key={section.id}
              id={section.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-linear-to-br from-card to-card/80"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold mb-2">
                        {section.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{section.content}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Section {index + 1}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {section.dos && section.donts ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <h4 className="font-semibold">Permitted Activities</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.dos.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <h4 className="font-semibold">Prohibited Activities</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.donts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {section.subPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </div>
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.warning && (
                  <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-600">Important Notice</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{section.warning}</p>
                  </div>
                )}
                
                {section.note && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-600">Note</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{section.note}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prohibited Activities */}
        <Card className="border-destructive/20 bg-destructive/5 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Strictly Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {prohibitedActivities.map((activity) => (
                <div 
                  key={activity}
                  className="flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-background"
                >
                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact & Related */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card id="contact" className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Legal Department
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  For questions about these terms or legal inquiries:
                </p>
                <div className="space-y-1">
                  <p className="font-medium">Email: legal@pharmaconnect.com</p>
                  <p className="text-sm text-muted-foreground">Response within 5 business days</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Mailing Address:</p>
                <p className="text-sm text-muted-foreground">
                  PharmaConnect Legal Department<br />
                  123 Healthcare Blvd, Suite 500<br />
                  Wilmington, DE 19801<br />
                  United States
                </p>
              </div>
              <Button className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                Submit Legal Inquiry
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Related Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Privacy Policy", description: "Data protection and privacy practices", href: "/privacy" },
                { title: "Cookie Policy", description: "Cookie usage and tracking information", href: "/cookies" },
                { title: "Pharmacy Agreement", description: "Terms for pharmacy partners", href: "/pharmacy-agreement" },
                { title: "HIPAA Compliance", description: "Health information protection", href: "/hipaa" },
                { title: "Refund Policy", description: "Returns and refund procedures", href: "/refunds" }
              ].map((doc) => (
                <Link 
                  key={doc.title}
                  href={doc.href}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Acceptance Footer */}
        <div className="mt-12 text-center">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Acceptance Required</h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  By creating an account or using PharmaConnect services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service and all related policies.
                </p>
                <div className="text-xs text-muted-foreground">
                  Last reviewed: {effectiveDate} • Version {version}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Eye,
  Download,
  Mail,
  UserCheck,
  Server,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  const lastUpdated = "February 15, 2026";

  const sections = [
    {
      id: "introduction",
      title: "Introduction & Scope",
      icon: <FileText className="h-5 w-5" />,
      content: `At PharmaConnect, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our pharmaceutical marketplace platform. This policy applies to all users including patients, healthcare providers, pharmacies, and administrators.`,
      subPoints: [
        "Applies to website, mobile applications, and related services",
        "Covers all personal data collected through platform interactions",
        "Includes data from registered users and visitors",
      ],
    },
    {
      id: "data-collection",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: `We collect various types of information to provide and improve our services:`,
      subPoints: [
        "Personal Identification: Name, email, phone number, address, date of birth",
        "Health Information: Prescriptions, medical history (with explicit consent)",
        "Financial Data: Payment information, billing details, transaction history",
        "Usage Data: IP address, browser type, device information, pages visited",
        "Location Data: For delivery services and pharmacy location features",
      ],
    },
    {
      id: "data-usage",
      title: "How We Use Your Information",
      icon: <Server className="h-5 w-5" />,
      content: `Your data helps us provide a secure and efficient pharmaceutical marketplace:`,
      subPoints: [
        "Process and fulfill medication orders and prescriptions",
        "Verify user identity and prevent fraudulent activities",
        "Provide personalized healthcare recommendations and alerts",
        "Communicate order updates, security alerts, and service changes",
        "Improve platform functionality and user experience",
        "Comply with legal obligations and regulatory requirements",
      ],
    },
    {
      id: "data-sharing",
      title: "Data Sharing & Disclosure",
      icon: <Users className="h-5 w-5" />,
      content: `We may share your information in limited circumstances:`,
      subPoints: [
        "With licensed pharmacies for prescription fulfillment",
        "With healthcare providers for treatment coordination (with consent)",
        "With payment processors for transaction completion",
        "With delivery services for order fulfillment",
        "When required by law enforcement or regulatory authorities",
        "During business transfers, mergers, or acquisitions",
      ],
    },
    {
      id: "data-security",
      title: "Security Measures",
      icon: <Lock className="h-5 w-5" />,
      content: `We implement robust security measures to protect your sensitive information:`,
      subPoints: [
        "End-to-end encryption for all sensitive health data",
        "Regular security audits and vulnerability assessments",
        "Two-factor authentication for all user accounts",
        "Secure socket layer (SSL) encryption for data transmission",
        "Regular employee training on data protection protocols",
        "Compliance with HIPAA and GDPR security standards",
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights & Control",
      icon: <UserCheck className="h-5 w-5" />,
      content: `You have significant control over your personal data:`,
      subPoints: [
        "Right to access and review your personal information",
        "Right to correct inaccurate or incomplete data",
        "Right to request deletion of your account and data",
        "Right to data portability in a structured format",
        "Right to withdraw consent for data processing",
        "Right to opt-out of marketing communications",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention Policy",
      icon: <Clock className="h-5 w-5" />,
      content: `We retain your data only as long as necessary:`,
      subPoints: [
        "Account data: Retained while account is active + 7 years",
        "Transaction records: 10 years for tax and regulatory compliance",
        "Health data: Based on medical record retention laws",
        "Inactive accounts: Deleted after 3 years of inactivity",
        "Marketing data: Retained until consent is withdrawn",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: <Globe className="h-5 w-5" />,
      content: `We work with trusted third parties to provide services:`,
      subPoints: [
        "Payment processors (Stripe, PayPal) for secure transactions",
        "Analytics services (Google Analytics) for platform improvement",
        "Email service providers for communication",
        "Cloud hosting providers for data storage",
        "Pharmacy verification services",
        "Prescription validation systems",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking Technologies",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: `We use cookies and similar technologies to enhance your experience:`,
      subPoints: [
        "Essential cookies for platform functionality",
        "Analytics cookies for performance monitoring",
        "Preference cookies for personalized settings",
        "Advertising cookies for relevant promotions",
        "You can manage cookie preferences in browser settings",
      ],
    },
    {
      id: "compliance",
      title: "Regulatory Compliance",
      icon: <Shield className="h-5 w-5" />,
      content: `We adhere to international data protection regulations:`,
      subPoints: [
        "HIPAA compliance for protected health information (PHI)",
        "GDPR compliance for European Union users",
        "CCPA compliance for California residents",
        "PIPEDA compliance for Canadian users",
        "Local pharmaceutical regulations and data protection laws",
      ],
    },
  ];

  const keyPrinciples = [
    {
      title: "Transparency",
      desc: "Clear communication about data practices",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      title: "Security",
      desc: "Multiple layers of data protection",
      icon: <Lock className="h-4 w-4" />,
    },
    {
      title: "Minimal Collection",
      desc: "Only essential data collected",
      icon: <Download className="h-4 w-4" />,
    },
    {
      title: "User Control",
      desc: "Full control over your data",
      icon: <UserCheck className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <Badge variant="outline" className="text-sm">
              Version 3.1
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Your privacy is our priority. Learn how we protect and manage your
            personal and health information.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Last updated: {lastUpdated}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Compliant with global regulations
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {keyPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="p-6 rounded-xl border bg-linear-to-br from-card to-card/80 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {principle.icon}
                </div>
                <h3 className="font-semibold">{principle.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{principle.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted/50 transition-colors text-sm"
                  >
                    {section.icon}
                    {section.title.split(" ")[0]}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              id={section.id}
              className="border-0 shadow-lg bg-linear-to-br from-card to-card/80 overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <CardHeader className="pb-4 border-b">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">
                        {section.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}/{sections.length}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2">
                      {section.content}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {section.subPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Special Notes for Important Sections */}
                {section.id === "data-security" && (
                  <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-600">
                        Security Certification
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our security protocols are audited quarterly by
                      independent third-party security firms.
                    </p>
                  </div>
                )}

                {section.id === "user-rights" && (
                  <div className="mt-6">
                    <p className="text-sm font-medium mb-3">
                      Exercise Your Rights:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        Download My Data
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Preferences
                      </Button>
                      <Button size="sm" variant="outline">
                        Submit Data Request
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact & Additional Info */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Our Privacy Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For privacy-related inquiries, data requests, or concerns:
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: privacy@pharmaconnect.com</p>
                <p className="text-sm text-muted-foreground">
                  Response time: Within 72 hours for general inquiries, 48 hours
                  for urgent requests
                </p>
              </div>
              <Button className="w-full">Contact Privacy Team</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-linear-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Related Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link
                  href="/terms"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/cookie-policy"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span>Cookie Policy</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/data-processing"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>Data Processing Agreement</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 p-4 rounded-xl bg-muted/30 border">
            <AlertCircle className="h-5 w-5 text-primary" />
            <p className="text-sm">
              By using PharmaConnect, you acknowledge that you have read,
              understood, and agree to be bound by this Privacy Policy.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            This policy is reviewed and updated quarterly. Significant changes
            will be communicated via email and platform notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

// Import ChevronRight icon
const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default PrivacyPolicyPage;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun, Smartphone, Save } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState([16]);
  const [language, setLanguage] = useState("english");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [dosageNotifications, setDosageNotifications] = useState(true);
  const [appointmentNotifications, setAppointmentNotifications] =
    useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30m");
  const [aiLearningEnabled, setAiLearningEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState("anonymous");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                  Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your account preferences and application settings
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <Tabs
            defaultValue="profile"
            className="space-y-4"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-3 rounded-full p-1 bg-secondary/50">
              <TabsTrigger
                value="notifications"
                className="rounded-full data-[state=active]:bg-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="rounded-full data-[state=active]:bg-white"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="rounded-full data-[state=active]:bg-white"
              >
                Privacy & AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">
                        Enable Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your medications and
                        appointments
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Notification Channels
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via text message
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reminder-notifications">
                          Medication Reminders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders to take your medications
                        </p>
                      </div>
                      <Switch
                        id="reminder-notifications"
                        checked={reminderNotifications}
                        onCheckedChange={setReminderNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dosage-notifications">
                          Dosage Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications about dosage changes and recommendations
                        </p>
                      </div>
                      <Switch
                        id="dosage-notifications"
                        checked={dosageNotifications}
                        onCheckedChange={setDosageNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appointment-notifications">
                          Appointments
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders about upcoming appointments
                        </p>
                      </div>
                      <Switch
                        id="appointment-notifications"
                        checked={appointmentNotifications}
                        onCheckedChange={setAppointmentNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="rounded-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>

                    <RadioGroup
                      value={theme}
                      onValueChange={setTheme}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="light"
                          id="light"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="h-6 w-6 mb-2" />
                          Light
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="dark"
                          id="dark"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="h-6 w-6 mb-2" />
                          Dark
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="system"
                          id="system"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Smartphone className="h-6 w-6 mb-2" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="font-size">Font Size</Label>
                        <span className="text-sm">{fontSize[0]}px</span>
                      </div>
                      <Slider
                        id="font-size"
                        min={12}
                        max={24}
                        step={1}
                        value={fontSize}
                        onValueChange={setFontSize}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="rounded-md">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select value={timeFormat} onValueChange={setTimeFormat}>
                        <SelectTrigger id="time-format" className="rounded-md">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="rounded-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="biometric">
                          Biometric Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use fingerprint or face recognition to log in
                        </p>
                      </div>
                      <Switch
                        id="biometric"
                        checked={biometricEnabled}
                        onCheckedChange={setBiometricEnabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <Select
                        value={sessionTimeout}
                        onValueChange={setSessionTimeout}
                      >
                        <SelectTrigger
                          id="session-timeout"
                          className="rounded-md"
                        >
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="30m">30 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI & Data</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-learning">AI Learning</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow the AI to learn from your data to improve dosage
                          recommendations
                        </p>
                      </div>
                      <Switch
                        id="ai-learning"
                        checked={aiLearningEnabled}
                        onCheckedChange={setAiLearningEnabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <Select
                        value={dataSharing}
                        onValueChange={setDataSharing}
                      >
                        <SelectTrigger id="data-sharing" className="rounded-md">
                          <SelectValue placeholder="Select data sharing option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No data sharing</SelectItem>
                          <SelectItem value="anonymous">
                            Anonymous data only
                          </SelectItem>
                          <SelectItem value="limited">
                            Limited personal data
                          </SelectItem>
                          <SelectItem value="full">
                            Full data sharing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dataSharing === "none" &&
                          "Your data will not be shared with anyone."}
                        {dataSharing === "anonymous" &&
                          "Only anonymized data will be used for research and improving the AI."}
                        {dataSharing === "limited" &&
                          "Limited personal data will be shared with your healthcare providers only."}
                        {dataSharing === "full" &&
                          "Your data may be shared with healthcare providers and research partners."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Download Your Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Get a copy of all your personal data
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Download Data
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="rounded-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Separator />

              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account and connected services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Change Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Connected EHR Systems</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage your connected electronic health record systems
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Manage Connections
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Delete Account</Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated
                          data
                        </p>
                      </div>
                      <Button variant="destructive" className="rounded-full">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

{
  /* <TabsContent value="profile" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account and connected services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Change Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Connected EHR Systems</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage your connected electronic health record systems
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Manage Connections
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Delete Account</Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated
                          data
                        </p>
                      </div>
                      <Button variant="destructive" className="rounded-full">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */
}

import { Navbar } from "@/components/NavBar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { authStore } from "@/store/auth.store"
import { CalendarDays, Crown, Mail } from "lucide-react"
import { toast } from "sonner"

const ProfilePage = () => {
  const { user, logout } = authStore()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <p>Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
              <div className="absolute -bottom-16 left-6">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarFallback className="text-3xl font-bold bg-white text-blue-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <CardHeader className="pt-20">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {user.name}
                    {user.isSubscribed && (
                      <Badge variant="premium" className="flex items-center gap-1">
                        <Crown className="w-4 h-4" />
                        PRO
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-muted-foreground">Member since {formatDate(user.createdAt)}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </Button>
              </div>
            </CardHeader>

            <Separator className="my-4" />

            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CalendarDays className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p>{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
            </CardContent>

            <CardFooter className="flex justify-end">
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
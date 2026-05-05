import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface Member {
  title: string
  name: string
  role: string
  institution: string
  area: string
  imageUrl?: string
}

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  function getInitials(name: string) {
    if (!name) return "";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }

  return (
    <Card size="sm" className="aspect-square rounded-2xl border py-2">
      <CardHeader className="flex h-full flex-col items-center justify-center gap-2 px-2 text-center">
        <Avatar size="lg" className="size-14">
          <AvatarImage src={member.imageUrl} alt={member.name} />
          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-sm leading-tight">
          {member.title} {member.name}
        </CardTitle>
        <Badge className="w-fit">
          {member.role}
        </Badge>
        <CardDescription className="text-xs leading-tight">
          {member.institution} - {member.area}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

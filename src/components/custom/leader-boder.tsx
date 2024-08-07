"use client"

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import axiosReq from "@/services/httpClient"
import { useParams } from "next/navigation"
interface RankingItem {
  userId: string;
  username: string;
  noTopicsCompleted: number;
  noTopicsRemaining: number;
  percentageCompletion: number;
  rank: number
}
export default function LeaderBoard() {
    const {subject_id: subjectId} = useParams()
    const [ranking, setRanking] = useState<RankingItem[]>([])
    useEffect(() => {
     const reqController = new AbortController();
    axiosReq.get(`/topics/${subjectId}/ranking`).then(response=>{
       setRanking(response.data.ranking)
        return response.data}).catch(err=>console.error(err))

    return () => reqController.abort();
    }, [subjectId])
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learners Leader board</CardTitle>
        <CardDescription>
          showing top 10 learners ranking
        </CardDescription>
      </CardHeader>
      <CardContent>
      {ranking.length > 0 &&   <Table>
          <TableHeader>
            <TableRow>
             
              <TableHead>Name</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead className="hidden md:table-cell">Topics Completed</TableHead>
              <TableHead className="hidden md:table-cell">
                Topics Remaining
              </TableHead>
              <TableHead className="hidden md:table-cell">percentage completion</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
          {ranking.map((rankItem:RankingItem) =>  <TableRow key={rankItem.userId}>
             
              <TableCell className="font-medium">
               {rankItem.username}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{rankItem.rank}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{rankItem.noTopicsCompleted}</TableCell>
              <TableCell className="hidden md:table-cell">{rankItem.noTopicsRemaining}</TableCell>
              <TableCell className="hidden md:table-cell">
               {rankItem.percentageCompletion}%
              </TableCell>
             
            </TableRow>)}
            
          </TableBody>
        </Table>}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> top ranking students
        </div>
      </CardFooter>
    </Card>
  )
}

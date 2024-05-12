import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users2 } from 'lucide-react';
import TodoApp from '@/components/Dashboard/Todos';

const todos = () => {
  return (
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                  Todos 
              </CardTitle>
              <Users2 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
              
              <TodoApp/>
          </CardContent>
      </Card>
  )
}

export default todos
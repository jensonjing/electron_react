import React from "react"
import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function RouteIndex() {
  const element = useRoutes(routes)
  
  return (
    <div>
      {/* 路由 */}  
      { element }
    </div>
  )
}
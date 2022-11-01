import React from 'react';
import './App.css';
import LayoutRoutes from './pages/LayoutPages'
import AuthRoutes from './pages/AuthPages'
import Loader from "./components/Loader";
import { useAuth } from "./providers/useAuth";

export function App() {
  const { users , loading} = useAuth()

  if (loading) return <Loader/>

  return users ? <LayoutRoutes/> : <AuthRoutes/>
}

export default App;

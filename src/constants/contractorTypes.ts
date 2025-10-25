import { 
  Zap,
  Shovel,
  Hammer,
  Home,
  AirVent,
  Trees,
  Leaf,
  PaintRoller,
  Wrench,
  Shield
} from 'lucide-react';

export const contractorTypes = [
  { id: 'electricians', name: 'Electricians', icon: Zap },
  { id: 'excavation-specialists', name: 'Excavation Specialists', icon: Shovel },
  { id: 'general-contractors', name: 'General Contractors', icon: Hammer },
  { id: 'home-builders', name: 'Home Builders', icon: Home },
  { id: 'hvac-specialists', name: 'HVAC Specialists', icon: AirVent },
  { id: 'landscapers', name: 'Landscapers', icon: Trees },
  { id: 'lawn-care-specialists', name: 'Lawn Care Specialists', icon: Leaf },
  { id: 'painters', name: 'Painters', icon: PaintRoller },
  { id: 'plumbers', name: 'Plumbers', icon: Wrench },
  { id: 'roofers', name: 'Roofers', icon: Shield },
];

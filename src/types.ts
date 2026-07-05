/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType =
  | 'borehole_drilling'
  | 'water_systems'
  | 'water_treatment'
  | 'borehole_rehab'
  | 'solar_borehole'
  | 'tank_installation';

export type ClientType = 'residential' | 'commercial' | 'industrial' | 'agricultural';

export type ProjectStatus =
  | 'site_inspection'
  | 'geophysical_survey'
  | 'drilling_in_progress'
  | 'casing_packing'
  | 'pump_installation'
  | 'testing_treatment'
  | 'final_commissioning'
  | 'completed';

export interface Booking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  location: string;
  state: string;
  serviceType: ServiceType;
  clientType: ClientType;
  status: ProjectStatus;
  notes?: string;
  createdAt: string;
  estimatedCost: number;
  progressPercentage: number;
}

export interface QuoteInput {
  serviceType: ServiceType;
  clientType: ClientType;
  state: string;
  soilType: 'sandy' | 'clay' | 'rocky' | 'mixed';
  estimatedDepthFeet: number; // e.g. 150ft, 250ft
  includeTreatment: boolean;
  includeSolar: boolean;
  includeTank: boolean;
  tankSizeLitres: number;
}

export interface QuoteResult {
  baseDrillingCost: number;
  casingMaterialsCost: number;
  pumpInstallationCost: number;
  treatmentSystemCost: number;
  solarSystemCost: number;
  tankTowerCost: number;
  geologySurcharge: number;
  subtotal: number;
  taxAndRegulatory: number;
  discount: number;
  total: number;
  timelineDays: string;
}

export interface WaterIssue {
  id: string;
  symptomName: string;
  problemTitle: string;
  description: string;
  causes: string[];
  severity: 'low' | 'medium' | 'high';
  solutionName: string;
  solutionDetails: string;
}

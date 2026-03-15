import type { Tier } from '../types/research';

export interface TierInfo {
  name: Tier;
  ordinal: number;
  fluid: string;
  drive: string;
  cube: string;
  maxRecipes: number | null;
  color: string;
}

export const TIER_INFO: Record<Tier, TierInfo> = {
  UNSTABLE: {
    name: 'UNSTABLE',
    ordinal: 0,
    fluid: 'researchcube:thinking_fluid',
    drive: 'researchcube:metadata_unstable',
    cube: 'researchcube:cube_unstable',
    maxRecipes: 2,
    color: '#6B7280',
  },
  BASIC: {
    name: 'BASIC',
    ordinal: 1,
    fluid: 'researchcube:thinking_fluid',
    drive: 'researchcube:metadata_reclaimed',
    cube: 'researchcube:cube_basic',
    maxRecipes: 4,
    color: '#10B981',
  },
  ADVANCED: {
    name: 'ADVANCED',
    ordinal: 2,
    fluid: 'researchcube:pondering_fluid',
    drive: 'researchcube:metadata_enhanced',
    cube: 'researchcube:cube_advanced',
    maxRecipes: 8,
    color: '#3B82F6',
  },
  PRECISE: {
    name: 'PRECISE',
    ordinal: 3,
    fluid: 'researchcube:reasoning_fluid',
    drive: 'researchcube:metadata_elaborate',
    cube: 'researchcube:cube_precise',
    maxRecipes: 12,
    color: '#F59E0B',
  },
  FLAWLESS: {
    name: 'FLAWLESS',
    ordinal: 4,
    fluid: 'researchcube:reasoning_fluid',
    drive: 'researchcube:metadata_cybernetic',
    cube: 'researchcube:cube_flawless',
    maxRecipes: 16,
    color: '#8B5CF6',
  },
  SELF_AWARE: {
    name: 'SELF_AWARE',
    ordinal: 5,
    fluid: 'researchcube:imagination_fluid',
    drive: 'researchcube:metadata_self_aware',
    cube: 'researchcube:cube_self_aware',
    maxRecipes: null,
    color: '#EF4444',
  },
};

export const TIER_FLUIDS: Record<Tier, string> = {
  UNSTABLE: 'researchcube:thinking_fluid',
  BASIC: 'researchcube:thinking_fluid',
  ADVANCED: 'researchcube:pondering_fluid',
  PRECISE: 'researchcube:reasoning_fluid',
  FLAWLESS: 'researchcube:reasoning_fluid',
  SELF_AWARE: 'researchcube:imagination_fluid',
};

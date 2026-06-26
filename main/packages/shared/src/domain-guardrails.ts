export const allowedPlatformOutputs = [
  'alert',
  'due_date_calculation',
  'completeness_check',
  'data_gap_flag',
  'draft_recommendation',
  'draft_helper_calculation',
  'preliminary_risk_ranking',
  'draft_rbi_output',
  'evidence_pack'
] as const;

export const prohibitedFinalDecisionActions = [
  'declare_asset_safe',
  'declare_fit_for_operation',
  'declare_layak_operasi',
  'issue_certificate_or_plo',
  'approve_final_rbi',
  'approve_final_rla',
  'approve_final_ffs',
  'approve_repair_alteration_rerating',
  'approve_interval_extension',
  'change_risk_acceptance_criteria',
  'final_legal_interpretation'
] as const;

export function isProhibitedFinalDecision(action: string): boolean {
  return prohibitedFinalDecisionActions.includes(action as (typeof prohibitedFinalDecisionActions)[number]);
}

export const decisionBoundaryNotice =
  'Draft/preliminary only. Authorized personnel must review and approve before any technical, legal, certification, RBI, RLA, FFS, safety, interval, or risk acceptance decision.';

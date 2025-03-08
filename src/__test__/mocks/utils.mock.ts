type ConditionEmail = { email: string }

type ConditionIdArray = { column: string; values: string[] }

function isValidConditionArrayId(
  condition: unknown
): condition is ConditionIdArray {
  return (
    typeof condition === 'object' &&
    condition !== null &&
    'column' in condition &&
    'values' in condition &&
    typeof (condition as { column: string; values: string[] }).column ===
      'string' &&
    Array.isArray((condition as { column: string; values: string[] }).values) &&
    (condition as { column: string; values: string[] }).values.every(
      val => typeof val === 'string'
    )
  )
}

function isValidConditionEmail(
  condition: unknown
): condition is ConditionEmail {
  return (
    typeof condition === 'object' &&
    condition !== null &&
    'email' in condition &&
    typeof (condition as ConditionEmail).email === 'string'
  )
}

export {
  isValidConditionEmail,
  isValidConditionArrayId,
  type ConditionEmail,
  type ConditionIdArray,
}

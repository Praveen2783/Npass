// import { Badge } from "@components/ui/badge"
// import { Progress } from "@components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { AlertTriangle, Badge, CheckCircle, Info } from "lucide-react"
import { analyzePasswordStrength, getStrengthColor, getStrengthLabel } from "./password-strength-utils"
import { Progress } from "./ui/progress"
// import { Tooltip } from "./ui/tooltip"

/**
 * Password Strength Indicator Component
 * @param {Object} props - Component props
 * @param {string} props.password - The password to analyze
 * @param {boolean} props.showDetails - Whether to show detailed analysis
 */
export function PasswordStrengthIndicator({ password, showDetails = false }) {
  const analysis = analyzePasswordStrength(password)

  const getProgressValue = (score) => {
    return Math.min((score / 9) * 100, 100)
  }

  const getProgressColor = (strength) => {
    switch (strength) {
      case "very-weak":
      case "weak":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "strong":
      case "very-strong":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!showDetails) {
    return (
      <TooltipProvider>
   
        <Tooltip>
          <TooltipTrigger>
            <Badge variant={getStrengthColor(analysis.strength)}>{getStrengthLabel(analysis.strength)}</Badge>
        
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Password Strength</span>
                {analysis.strength === "very-weak" || analysis.strength === "weak" ? (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                ) : analysis.strength === "medium" ? (
                  <Info className="h-4 w-4 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
          
              <Progress value={getProgressValue(analysis.score)} className="w-32 h-2" />
              {analysis.feedback.length > 0 && (
                <ul className="text-xs space-y-1">
                  {analysis.feedback.slice(0, 3).map((feedback, index) => (
                    <li key={index}>• {feedback}</li>
                  ))}
                </ul>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant={getStrengthColor(analysis.strength)}>{getStrengthLabel(analysis.strength)}</Badge>
        {analysis.strength === "very-weak" || analysis.strength === "weak" ? (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        ) : analysis.strength === "medium" ? (
          <Info className="h-4 w-4 text-yellow-500" />
        ) : (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Strength Score</span>
          <span>{analysis.score}/9</span>
        </div>
        <div className="relative">
          <Progress value={getProgressValue(analysis.score)} className="h-2" />
          <div
            className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(analysis.strength)}`}
            style={{ width: `${getProgressValue(analysis.score)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`flex items-center gap-1 ${analysis.hasLowercase ? "text-green-600" : "text-red-600"}`}>
          {analysis.hasLowercase ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          Lowercase
        </div>
        <div className={`flex items-center gap-1 ${analysis.hasUppercase ? "text-green-600" : "text-red-600"}`}>
          {analysis.hasUppercase ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          Uppercase
        </div>
        <div className={`flex items-center gap-1 ${analysis.hasNumbers ? "text-green-600" : "text-red-600"}`}>
          {analysis.hasNumbers ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          Numbers
        </div>
        <div className={`flex items-center gap-1 ${analysis.hasSymbols ? "text-green-600" : "text-red-600"}`}>
          {analysis.hasSymbols ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          Symbols
        </div>
      </div>

      {analysis.feedback.length > 0 && (
        <div className="space-y-1">
          <span className="text-sm font-medium">Recommendations:</span>
          <ul className="text-xs space-y-1 text-muted-foreground">
            {analysis.feedback.map((feedback, index) => (
              <li key={index}>• {feedback}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

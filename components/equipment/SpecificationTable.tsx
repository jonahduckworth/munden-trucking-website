import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Specification {
  label: string
  value: string | number
  unit?: string
  highlight?: boolean
}

interface SpecificationGroup {
  title: string
  specs: Specification[]
}

interface SpecificationTableProps {
  specifications: Specification[] | SpecificationGroup[]
  className?: string
  striped?: boolean
}

function isSpecificationGroup(item: Specification | SpecificationGroup): item is SpecificationGroup {
  return 'title' in item && 'specs' in item
}

export function SpecificationTable({ 
  specifications, 
  className,
  striped = true 
}: SpecificationTableProps) {
  // Check if we have grouped specifications
  const isGrouped = specifications.length > 0 && isSpecificationGroup(specifications[0])

  if (isGrouped) {
    return (
      <div className={cn("space-y-6", className)}>
        {(specifications as SpecificationGroup[]).map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="font-semibold mb-3">{group.title}</h3>
            <Table>
              <TableBody>
                {group.specs.map((spec, index) => (
                  <TableRow 
                    key={index}
                    className={cn(
                      striped && index % 2 === 0 && "bg-muted/30",
                      spec.highlight && "font-semibold"
                    )}
                  >
                    <TableCell className="font-medium">{spec.label}</TableCell>
                    <TableCell className="text-right">
                      {spec.value}{spec.unit && ` ${spec.unit}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    )
  }

  // Flat specification list
  return (
    <Table className={className}>
      <TableBody>
        {(specifications as Specification[]).map((spec, index) => (
          <TableRow 
            key={index}
            className={cn(
              striped && index % 2 === 0 && "bg-muted/30",
              spec.highlight && "font-semibold"
            )}
          >
            <TableCell className="font-medium">{spec.label}</TableCell>
            <TableCell className="text-right">
              {spec.value}{spec.unit && ` ${spec.unit}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Companion component for comparison tables
interface ComparisonSpec {
  label: string
  values: (string | number | boolean)[]
  unit?: string
}

interface ComparisonTableProps {
  headers: string[]
  specifications: ComparisonSpec[]
  className?: string
}

export function ComparisonTable({ headers, specifications, className }: ComparisonTableProps) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Specification</TableHead>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-center">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {specifications.map((spec, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{spec.label}</TableCell>
            {spec.values.map((value, valueIndex) => (
              <TableCell key={valueIndex} className="text-center">
                {typeof value === 'boolean' ? (
                  value ? '✓' : '—'
                ) : (
                  `${value}${spec.unit ? ` ${spec.unit}` : ''}`
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
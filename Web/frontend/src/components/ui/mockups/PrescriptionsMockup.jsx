// Prescriptions view — OCR dropzone + Recent Prescriptions with confidence. Theme-aware.
import { Sparkles, FileText, Upload, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const RECENT = [
  {
    id: 'RX001234',
    patient: 'Rajesh Kumar',
    doctor: 'Dr. Sharma',
    medicines: ['Azithromycin 500mg', 'Paracetamol 650mg'],
    status: 'Pending',
    confidence: '92%',
    tone: 'amber',
  },
  {
    id: 'RX001235',
    patient: 'Priya Singh',
    doctor: 'Dr. Verma',
    medicines: ['Metformin 500mg', 'Omeprazole 20mg'],
    status: 'Dispensed',
    confidence: '88%',
    tone: 'emerald',
  },
];

const STATUS_TONES = {
  amber:   { chip: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',     icon: Clock },
  emerald: { chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', icon: CheckCircle2 },
};

export default function PrescriptionsMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="rx" title="Prescriptions" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-fg">Prescriptions</span>
              <span className="text-[10px] text-fg-subtle">OCR-powered intake</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
            <Upload className="h-3 w-3" aria-hidden="true" />
            Upload
          </span>
        </div>

        <div className="rounded-xl border-2 border-dashed border-brand-200 bg-gradient-to-br from-brand-50/50 to-cloud-300/10 p-4 dark:border-brand-500/30 dark:from-brand-500/10 dark:to-cloud-400/10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-soft text-brand-700 dark:text-brand-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="mt-1.5 text-[11px] font-semibold text-fg">AI-Powered OCR Scanner</div>
            <p className="text-[9px] text-fg-subtle">Drag and drop a prescription image, or click to browse.</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface px-2 py-1 text-[10px] font-medium text-fg">
              <Upload className="h-3 w-3" aria-hidden="true" />
              Select file
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-semibold text-fg">Recent prescriptions</div>
          {RECENT.map((rx) => {
            const tone = STATUS_TONES[rx.tone];
            const StatusIcon = tone.icon;
            return (
              <div
                key={rx.id}
                className="rounded-xl border border-line bg-surface p-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-brand-600" aria-hidden="true" />
                    <span className="text-[10px] font-semibold text-fg">{rx.id}</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold',
                        tone.chip,
                      )}
                    >
                      <StatusIcon className="h-2.5 w-2.5" aria-hidden="true" />
                      {rx.status}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-brand-700 nums-tabular dark:text-brand-300">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                    {rx.confidence}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-fg">{rx.patient}</span>
                    <span className="text-[9px] text-fg-subtle">{rx.doctor}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {rx.medicines.map((med) => (
                      <span
                        key={med}
                        className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[9px] font-medium text-fg"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MockupShell>
  );
}

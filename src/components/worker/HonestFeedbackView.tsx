import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Shield,
  Star,
  Send,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { VoiceInputButton } from '../common/VoiceInputButton';
import { FeedbackEntry } from '../../types';

export const HonestFeedbackView: React.FC = () => {
  const { sector, t, feedbacks, submitFeedback } = useApp();

  const [topic, setTopic] = useState<FeedbackEntry['topic']>('workload');
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitFeedback({
      sector,
      topic,
      rating,
      comment: comment.trim()
    });

    setSubmitted(true);
    setComment('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Sector feedback entries
  const sectorFeedbacks = feedbacks.filter((f) => f.sector === sector);

  return (
    <div className="space-y-6">
      {/* Educational Notice: Confidentiality vs Anonymity (Mandatory Requirement) */}
      <div className="bg-emerald-950 text-white rounded-xl p-6 shadow-xs border border-emerald-900">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-emerald-900 shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-teal-300" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-teal-100 flex items-center gap-2">
              <span>{t.confidentialNoticeTitle}</span>
              <span className="text-[11px] font-normal text-teal-300 font-mono">
                [Safety & Privacy Charter]
              </span>
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
              {t.confidentialNoticeBody}
            </p>
            <div className="text-[11px] text-teal-300 pt-1 flex flex-wrap gap-4">
              <span>✓ Identity never displayed on reports</span>
              <span>✓ Aggregated into organizational themes</span>
              <span>✓ Zero punitive retaliation policy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feedback Submission Form (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-700" />
              <span>Share Honest Operational Feedback</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Input goes directly into administrative trend summaries for {sector === 'construction' ? 'Construction Sites' : 'Academic Faculties'}.
            </p>
          </div>

          {submitted && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.feedbackSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Feedback Area / Topic */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.feedbackTopic}</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as FeedbackEntry['topic'])}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:border-teal-700"
              >
                <option value="workload">Workload, Shift Length & Rest Periods</option>
                <option value="management">Supervisory Support & Communication</option>
                <option value="safety_culture">Safety Culture & Hazard Responsiveness</option>
                <option value="equipment">Tool, PPE & Equipment Adequacy</option>
                <option value="compensation">Payment Transparency & Overtime Processing</option>
              </select>
            </div>

            {/* Rating Selector */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t.ratingScore}</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      rating === star
                        ? 'bg-teal-900 text-white border-teal-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        star <= rating ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                    <span>{star}</span>
                  </button>
                ))}
                <span className="text-[11px] text-slate-400 pl-2">
                  {rating === 1 && 'Severe concern'}
                  {rating === 2 && 'Needs improvement'}
                  {rating === 3 && 'Acceptable'}
                  {rating === 4 && 'Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              </div>
            </div>

            {/* Comment Area with Voice Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">{t.feedbackComments} *</label>
                <VoiceInputButton
                  onTranscript={(text) => setComment((prev) => (prev ? `${prev} ${text}` : text))}
                  targetFieldLabel="Feedback comments"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Describe your constructive observations. Avoid including your badge number or unique personal markers to preserve confidentiality..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-700 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.submitFeedback}</span>
            </button>
          </form>
        </div>

        {/* Aggregated Thematic View (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-700" />
                <span>How Supervisors Receive This Feedback</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Notice: Names and badge numbers are completely stripped. Management only sees anonymized themes.
              </p>
            </div>

            <div className="space-y-3">
              {sectorFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/60 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 uppercase tracking-wide text-[11px]">
                      Topic: {fb.topic.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <span>Rating: {fb.rating}/5</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{fb.comment}"
                  </p>
                  <div className="text-[10px] text-teal-800 font-medium">
                    Aggregated into workforce health radar: [{fb.sentiment.toUpperCase()}]
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>FairWork AI automatically flags persistent negative workload feedback for supervisor review.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

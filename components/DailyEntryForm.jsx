'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/database'

const SURAHS = [
  { id: 1, name: 'الفاتحة', verses: 7 },
  { id: 2, name: 'البقرة', verses: 286 },
  { id: 3, name: 'آل عمران', verses: 200 },
  { id: 4, name: 'النساء', verses: 176 },
  { id: 5, name: 'المائدة', verses: 120 },
  { id: 6, name: 'الأنعام', verses: 165 },
  { id: 7, name: 'الأعراف', verses: 206 },
  { id: 8, name: 'الأنفال', verses: 75 },
  { id: 9, name: 'التوبة', verses: 129 },
  { id: 10, name: 'يونس', verses: 109 },
  { id: 11, name: 'هود', verses: 123 },
  { id: 12, name: 'يوسف', verses: 111 },
  { id: 13, name: 'الرعد', verses: 43 },
  { id: 14, name: 'إبراهيم', verses: 52 },
  { id: 15, name: 'الحجر', verses: 99 },
  { id: 16, name: 'النحل', verses: 128 },
  { id: 17, name: 'الإسراء', verses: 111 },
  { id: 18, name: 'الكهف', verses: 110 },
  { id: 19, name: 'مريم', verses: 98 },
  { id: 20, name: 'طه', verses: 135 },
  { id: 21, name: 'الأنبياء', verses: 112 },
  { id: 22, name: 'الحج', verses: 78 },
  { id: 23, name: 'المؤمنون', verses: 118 },
  { id: 24, name: 'النور', verses: 64 },
  { id: 25, name: 'الفرقان', verses: 77 },
  { id: 26, name: 'الشعراء', verses: 227 },
  { id: 27, name: 'النمل', verses: 93 },
  { id: 28, name: 'القصص', verses: 88 },
  { id: 29, name: 'العنكبوت', verses: 69 },
  { id: 30, name: 'الروم', verses: 60 },
  { id: 31, name: 'لقمان', verses: 34 },
  { id: 32, name: 'السجدة', verses: 30 },
  { id: 33, name: 'الأحزاب', verses: 73 },
  { id: 34, name: 'سبأ', verses: 54 },
  { id: 35, name: 'فاطر', verses: 45 },
  { id: 36, name: 'يس', verses: 83 },
  { id: 37, name: 'الصافات', verses: 182 },
  { id: 38, name: 'ص', verses: 88 },
  { id: 39, name: 'الزمر', verses: 75 },
  { id: 40, name: 'غافر', verses: 85 },
  { id: 41, name: 'فصلت', verses: 54 },
  { id: 42, name: 'الشورى', verses: 53 },
  { id: 43, name: 'الزخرف', verses: 89 },
  { id: 44, name: 'الدخان', verses: 59 },
  { id: 45, name: 'الجاثية', verses: 37 },
  { id: 46, name: 'الأحقاف', verses: 35 },
  { id: 47, name: 'محمد', verses: 38 },
  { id: 48, name: 'الفتح', verses: 29 },
  { id: 49, name: 'الحجرات', verses: 18 },
  { id: 50, name: 'ق', verses: 45 },
  { id: 51, name: 'الذاريات', verses: 60 },
  { id: 52, name: 'الطور', verses: 49 },
  { id: 53, name: 'النجم', verses: 62 },
  { id: 54, name: 'القمر', verses: 55 },
  { id: 55, name: 'الرحمن', verses: 78 },
  { id: 56, name: 'الواقعة', verses: 96 },
  { id: 57, name: 'الحديد', verses: 29 },
  { id: 58, name: 'المجادلة', verses: 22 },
  { id: 59, name: 'الحشر', verses: 24 },
  { id: 60, name: 'الممتحنة', verses: 13 },
  { id: 61, name: 'الصف', verses: 14 },
  { id: 62, name: 'الجمعة', verses: 11 },
  { id: 63, name: 'المنافقون', verses: 11 },
  { id: 64, name: 'التغابن', verses: 18 },
  { id: 65, name: 'الطلاق', verses: 12 },
  { id: 66, name: 'التحريم', verses: 12 },
  { id: 67, name: 'الملك', verses: 30 },
  { id: 68, name: 'القلم', verses: 52 },
  { id: 69, name: 'الحاقة', verses: 52 },
  { id: 70, name: 'المعارج', verses: 44 },
  { id: 71, name: 'نوح', verses: 28 },
  { id: 72, name: 'الجن', verses: 28 },
  { id: 73, name: 'المزمل', verses: 20 },
  { id: 74, name: 'المدثر', verses: 56 },
  { id: 75, name: 'القيامة', verses: 40 },
  { id: 76, name: 'الإنسان', verses: 31 },
  { id: 77, name: 'المرسلات', verses: 50 },
  { id: 78, name: 'النبأ', verses: 40 },
  { id: 79, name: 'النازعات', verses: 46 },
  { id: 80, name: 'عبس', verses: 42 },
  { id: 81, name: 'التكوير', verses: 29 },
  { id: 82, name: 'الإنفطار', verses: 19 },
  { id: 83, name: 'المطففين', verses: 36 },
  { id: 84, name: 'الإنشقاق', verses: 25 },
  { id: 85, name: 'البروج', verses: 22 },
  { id: 86, name: 'الطارق', verses: 17 },
  { id: 87, name: 'الأعلى', verses: 19 },
  { id: 88, name: 'الغاشية', verses: 26 },
  { id: 89, name: 'الفجر', verses: 30 },
  { id: 90, name: 'البلد', verses: 20 },
  { id: 91, name: 'الشمس', verses: 15 },
  { id: 92, name: 'الليل', verses: 21 },
  { id: 93, name: 'الضحى', verses: 11 },
  { id: 94, name: 'الشرح', verses: 8 },
  { id: 95, name: 'التين', verses: 8 },
  { id: 96, name: 'العلق', verses: 19 },
  { id: 97, name: 'القدر', verses: 5 },
  { id: 98, name: 'البينة', verses: 8 },
  { id: 99, name: 'الزلزلة', verses: 8 },
  { id: 100, name: 'العاديات', verses: 11 },
  { id: 101, name: 'القارعة', verses: 11 },
  { id: 102, name: 'التكاثر', verses: 8 },
  { id: 103, name: 'العصر', verses: 3 },
  { id: 104, name: 'الهمزة', verses: 9 },
  { id: 105, name: 'الفيل', verses: 5 },
  { id: 106, name: 'قريش', verses: 4 },
  { id: 107, name: 'الماعون', verses: 7 },
  { id: 108, name: 'الكوثر', verses: 3 },
  { id: 109, name: 'الكافرون', verses: 6 },
  { id: 110, name: 'النصر', verses: 3 },
  { id: 111, name: 'المسد', verses: 5 },
  { id: 112, name: 'الإخلاص', verses: 4 },
  { id: 113, name: 'الفلق', verses: 5 },
  { id: 114, name: 'الناس', verses: 6 },
]

export default function DailyEntryForm() {
  const [groups, setGroups] = useState([])
  const [students, setStudents] = useState([])

  const [groupId, setGroupId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [progressDate, setProgressDate] = useState(() => new Date().toISOString().split('T')[0])

  const [fromSurah, setFromSurah] = useState(1)
  const [fromAyah, setFromAyah] = useState(1)
  const [toSurah, setToSurah] = useState(1)
  const [toAyah, setToAyah] = useState(1)

  const [memPages, setMemPages] = useState('')
  const [revPages, setRevPages] = useState('')
  const [notes, setNotes] = useState('')

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id)
    })
  }, [])

  useEffect(() => {
    async function fetchGroups() {
      const { data, error } = await supabase
        .from('groups')
        .select('id, name')
        .order('name')
      if (!error) setGroups(data || [])
    }
    fetchGroups()
  }, [])

  useEffect(() => {
    if (!groupId) {
      setStudents([])
      setStudentId('')
      return
    }
    async function fetchStudents() {
      const { data, error } = await supabase
        .from('students')
        .select('id, student_name')
        .eq('group_id', groupId)
        .eq('status', 'active')
        .order('student_name')
      if (!error) setStudents(data || [])
    }
    fetchStudents()
  }, [groupId])

  const getMaxAyah = (surahId) =>
    SURAHS.find((s) => s.id === Number(surahId))?.verses || 286

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!studentId) {
      setMessage({ type: 'error', text: 'يرجى اختيار الطالبة' })
      return
    }
    if (!userId) {
      setMessage({ type: 'error', text: 'يجب تسجيل الدخول أولاً' })
      return
    }

    setSaving(true)

    const { error } = await supabase.from('daily_progress').insert({
      student_id: studentId,
      progress_date: progressDate,
      memorization_pages: parseFloat(memPages || 0),
      revision_pages: parseFloat(revPages || 0),
      notes: notes.trim() || null,
      entered_by: userId,
    })

    setSaving(false)

    if (error) {
      setMessage({ type: 'error', text: 'فشل الحفظ: ' + error.message })
    } else {
      setMessage({ type: 'success', text: '✅ تم حفظ الإنجاز اليومي بنجاح' })
      setMemPages('')
      setRevPages('')
      setNotes('')
      setFromAyah(1)
      setToAyah(1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-emerald-700 p-4 md:p-5 text-white text-center">
          <h1 className="text-xl md:text-2xl font-bold">إدخال إنجاز يومي</h1>
          <p className="text-emerald-100 text-sm mt-1">مقرأة سَنا الآي</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-5">
          {message && (
            <div
              className={`p-3 rounded-lg text-sm border ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* الحلقة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الحلقة</label>
            <select
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">-- اختر الحلقة --</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* الطالبة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الطالبة</label>
            <select
              required
              disabled={!groupId || students.length === 0}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">-- اختر الطالبة --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.student_name}
                </option>
              ))}
            </select>
            {groupId && students.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">لا توجد طالبات نشيطات في هذه الحلقة</p>
            )}
          </div>

          {/* السور والآيات */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
            <h2 className="font-semibold text-gray-800 border-b border-gray-200 pb-2 text-sm md:text-base">
              📖 موضوع الحفظ / المراجعة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">من سورة</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
                  value={fromSurah}
                  onChange={(e) => {
                    setFromSurah(Number(e.target.value))
                    setFromAyah(1)
                  }}
                >
                  {SURAHS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">من آية</label>
                <input
                  type="number"
                  min={1}
                  max={getMaxAyah(fromSurah)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={fromAyah}
                  onChange={(e) => setFromAyah(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">إلى سورة</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
                  value={toSurah}
                  onChange={(e) => {
                    setToSurah(Number(e.target.value))
                    setToAyah(1)
                  }}
                >
                  {SURAHS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">إلى آية</label>
                <input
                  type="number"
                  min={1}
                  max={getMaxAyah(toSurah)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={toAyah}
                  onChange={(e) => setToAyah(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* الأوجه */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                أوجه الحفظ
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="مثال: 1.5"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={memPages}
                onChange={(e) => setMemPages(e.target.value)}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                0.5 = نصف وجه | 1 = وجه | 2 = وجهان
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                أوجه المراجعة
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={revPages}
                onChange={(e) => setRevPages(e.target.value)}
              />
            </div>
          </div>

          {/* التاريخ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              التاريخ
            </label>
            <input
              type="date"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={progressDate}
              onChange={(e) => setProgressDate(e.target.value)}
            />
          </div>

          {/* الملاحظات */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              placeholder="أي ملاحظة على أداء الطالبة..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* زر الحفظ */}
          <button
            type="submit"
            disabled={saving || !userId}
            className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                جاري الحفظ...
              </span>
            ) : (
              '💾 حفظ الإنجاز في Supabase'
            )}
          </button>
        </form>
      </div>
    </div>
  )
   }

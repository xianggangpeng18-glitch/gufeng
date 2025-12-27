
import React, { useState, useCallback } from 'react';
import { MoodCategory, StyleTheme, MoodSelection } from './types';
import { MOOD_CATEGORIES, STYLE_THEMES } from './constants';
import { generateClassicalQuote } from './services/geminiService';
import { Loader2, Feather, RefreshCw, Send, Quote, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<MoodSelection>({
    category: MoodCategory.PEACE,
    theme: StyleTheme.NATURE,
    description: '',
    intensity: 3,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selection.description.trim()) {
      setError("请至少落笔数言，描述一二。");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const quote = await generateClassicalQuote(selection);
      setResult(quote);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "生成失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setResult(null);
    setSelection({
      category: MoodCategory.PEACE,
      theme: StyleTheme.NATURE,
      description: '',
      intensity: 3,
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="mb-12 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-2 tracking-widest font-calligraphy">
          墨染心绪
        </h1>
        <p className="text-stone-500 italic">—— 借古人之笔，绘今时之情 ——</p>
      </header>

      <main className="w-full max-w-2xl bg-white/70 backdrop-blur-sm border border-stone-200 shadow-2xl rounded-2xl overflow-hidden relative">
        {/* Step Indicator */}
        <div className="flex justify-between px-8 pt-8 pb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/3 h-1 rounded-full transition-all duration-500 ${
                step >= s ? 'bg-stone-800' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-stone-700 flex items-center">
                  <span className="mr-2">壱.</span> 择一心境
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {MOOD_CATEGORIES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelection({ ...selection, category: m.id })}
                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                        selection.category === m.id
                          ? `${m.color} scale-105 shadow-md`
                          : 'bg-white border-transparent hover:border-stone-200'
                      }`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-stone-700 flex items-center">
                  <span className="mr-2">弐.</span> 选一意象
                </h2>
                <div className="space-y-3">
                  {STYLE_THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelection({ ...selection, theme: t.id })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selection.theme === t.id
                          ? 'bg-stone-800 text-stone-50 border-stone-800 shadow-lg translate-x-1'
                          : 'bg-white border-stone-100 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        {t.label}
                        {selection.theme === t.id && <ChevronRight size={16} />}
                      </div>
                      <div className={`text-sm mt-1 ${selection.theme === t.id ? 'text-stone-300' : 'text-stone-500'}`}>
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 mt-4 bg-stone-800 text-stone-100 rounded-xl font-bold hover:bg-stone-700 transition-colors shadow-xl flex items-center justify-center gap-2 group"
              >
                下一步 <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-stone-700 flex items-center">
                  <span className="mr-2">参.</span> 抒写心志
                </h2>
                <div className="relative">
                  <textarea
                    value={selection.description}
                    onChange={(e) => setSelection({ ...selection, description: e.target.value })}
                    placeholder="在此倾诉您的心事，或寥寥数语，或洋洋洒洒..."
                    className="w-full h-48 p-6 bg-stone-50 border-stone-200 border-2 rounded-2xl focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none resize-none text-stone-700 leading-relaxed placeholder:italic"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-stone-400">
                    建议描述具体的画面或感受
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-stone-700">情感烈度</h2>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={selection.intensity}
                  onChange={(e) => setSelection({ ...selection, intensity: parseInt(e.target.value) })}
                  className="w-full accent-stone-800 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-stone-400 font-medium">
                  <span>如水平静</span>
                  <span>微澜泛起</span>
                  <span>心潮澎湃</span>
                  <span>万千波澜</span>
                  <span>轰烈决绝</span>
                </div>
              </section>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 py-4 border-2 border-stone-200 text-stone-600 rounded-xl font-bold hover:bg-stone-50 transition-colors disabled:opacity-50"
                >
                  返回修改
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-[2] py-4 bg-stone-800 text-stone-100 rounded-xl font-bold hover:bg-stone-700 transition-colors shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      正在研墨...
                    </>
                  ) : (
                    <>
                      <Feather size={18} />
                      落笔成章
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="flex flex-col items-center py-10 animate-in zoom-in duration-700">
              <div className="relative p-12 bg-white border border-stone-100 shadow-inner rounded-lg flex flex-col items-center">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 text-stone-200">
                  <Quote size={40} />
                </div>
                <div className="absolute bottom-4 right-4 text-stone-200 rotate-180">
                  <Quote size={40} />
                </div>

                {/* The Quote */}
                <div className="vertical-text text-3xl md:text-4xl font-calligraphy text-stone-800 leading-loose tracking-widest min-h-[300px] flex items-center justify-center">
                  {result.split('').map((char, i) => (
                    <span key={i} className="mb-2">{char}</span>
                  ))}
                </div>

                <div className="mt-8 border-t border-stone-100 pt-6 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center mb-2">
                    <span className="text-[10px] text-stone-400">印</span>
                  </div>
                  <div className="text-xs text-stone-400 tracking-widest">
                    {selection.category} · {selection.theme}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12 w-full">
                <button
                  onClick={reset}
                  className="flex-1 py-4 border-2 border-stone-200 text-stone-600 rounded-xl font-bold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  重整心情
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    alert('佳句已拓印至剪贴板');
                  }}
                  className="flex-1 py-4 bg-stone-800 text-stone-100 rounded-xl font-bold hover:bg-stone-700 transition-colors shadow-xl"
                >
                  拓印珍藏
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 text-stone-400 text-sm flex flex-col items-center gap-2">
        <p>愿此间文字，能抚平你心头微澜</p>
        <div className="flex gap-4 mt-2">
            <span className="opacity-50">© 墨染心绪 · AI 文学实验室</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

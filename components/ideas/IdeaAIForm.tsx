'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { List, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function IdeaAIForm() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ai/idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    console.log('RESSS', res);

    const data = await res.json();

    console.log('RESSS', data.answer);

    setResponse(data.answer);
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: response }),
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Idée sauvegardée !');
      } else {
        alert('❌ Erreur : ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de la requête');
    }
  };

  return (
    <>
      <div className="p-0">
        <div className="space-y-4">
          {/* INPUT */}
          <div className="grid w-full gap-4">
            <div className="rounded-md p-1 bg-gradient-to-r from-blue-500 via-blue-300 to-cyan-400">
              <Textarea
                placeholder="Décris une idée de produit..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                className="w-full rounded-md bg-white p-2 text-lg placeholder:text-gray-400"
              />
            </div>
            <Button
              className="w-full flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? `Génération...` : `Envoyer à l'IA`}
            </Button>
          </div>

          {/* REPONSE IA */}
          {response && (
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-bold mb-4">🤖 Réponse de l’IA :</h3>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {response}
                </ReactMarkdown>
              </div>

              <Button
                // variant="default"
                className="mt-2"
                onClick={handleSave} // <- ici on appelle directement la fonction
              >
                💾 Sauvegarder la nouvelle idée
              </Button>

              {/* <Button
              className="w-full flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? `Génération...` : `Envoyer à l'IA`}
            </Button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

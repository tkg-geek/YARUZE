'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [twitterShareUrl, setTwitterShareUrl] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // OGP画像URLを生成
  useEffect(() => {
    if (title) {
      const params = new URLSearchParams();
      params.append('title', title);
      if (description) {
        params.append('description', description);
      }
      
      // 絶対URLを生成（開発環境とプロダクション環境で異なる）
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://' + window.location.host
        : 'http://' + window.location.host;
      
      // プレビュー更新のためのダミーパラメータを追加（キャッシュ回避）
      const timestamp = new Date().getTime();
      params.append('t', timestamp.toString());
      
      setIsPreviewLoading(true);
      const imageUrl = `${baseUrl}/api/og?${params.toString()}`;
      setOgImageUrl(imageUrl);
      
      // プレビュー読み込み完了を検知
      const img = new window.Image();
      img.onload = () => setIsPreviewLoading(false);
      img.onerror = () => setIsPreviewLoading(false);
      img.src = imageUrl;
      
      // X（Twitter）共有URL
      const shareText = encodeURIComponent(`${title}${description ? '\n' + description : ''}\n\n#YARUZE`);
      
      // パラメータを含むURLを生成（OGP画像が表示されるように）
      const shareUrlParams = new URLSearchParams();
      shareUrlParams.append('title', title);
      if (description) {
        shareUrlParams.append('description', description);
      }
      const fullShareUrl = `${window.location.origin}/share?${shareUrlParams.toString()}`;
      const encodedShareUrl = encodeURIComponent(fullShareUrl);
      
      setTwitterShareUrl(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedShareUrl}`);
    } else {
      setOgImageUrl('');
      setTwitterShareUrl('');
    }
  }, [title, description]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            YARUZE
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            これからやることを宣言して、SNSでシェアしよう
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  やるぜ宣言 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="例：新しいプログラミング言語を学びます"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  詳しく何をやるぜ？
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="詳細や目標を書いてみましょう"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                {title && (
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1DA1F2] hover:bg-[#1a94da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Xでシェアする
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {ogImageUrl && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">プレビュー</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg bg-gray-100">
                {isPreviewLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">読み込み中...</p>
                  </div>
                ) : (
                  <Image
                    src={ogImageUrl}
                    alt="OGP画像プレビュー"
                    className="w-full h-full object-cover"
                    fill
                    unoptimized
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

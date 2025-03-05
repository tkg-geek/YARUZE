'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [twitterShareUrl, setTwitterShareUrl] = useState('');
  const [lineShareUrl, setLineShareUrl] = useState('');
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
      
      // プレビュー読み込み完了を検知
      const img = new window.Image();
      img.onload = () => {
        setOgImageUrl(imageUrl);
        setIsPreviewLoading(false);
      };
      img.onerror = () => {
        setOgImageUrl('');
        setIsPreviewLoading(false);
      };
      img.src = imageUrl;
      
      // パラメータを含むURLを生成（OGP画像が表示されるように）
      const shareUrlParams = new URLSearchParams();
      shareUrlParams.append('title', title);
      if (description) {
        shareUrlParams.append('description', description);
      }
      const fullShareUrl = `${window.location.origin}/share?${shareUrlParams.toString()}`;
      const encodedShareUrl = encodeURIComponent(fullShareUrl);
      
      // X（Twitter）共有URL
      const shareText = encodeURIComponent(`${title}${description ? '\n' + description : ''}\n\n#YARUZE`);
      setTwitterShareUrl(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedShareUrl}`);
      
      // LINE共有URL
      setLineShareUrl(`https://social-plugins.line.me/lineit/share?url=${encodedShareUrl}`);
    } else {
      setOgImageUrl('');
      setTwitterShareUrl('');
      setLineShareUrl('');
    }
  }, [title, description]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              YARUZE
            </Link>
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            これからやることをSNSで宣言しよう
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
                    placeholder="例：新しいプログラミング言語を学ぶぜ!!"
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
                    placeholder="詳細や目標を書いてみるぜ"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <a
                  href={title ? twitterShareUrl : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    title 
                      ? "text-white bg-[#1DA1F2] hover:bg-[#1a94da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]" 
                      : "text-gray-400 bg-gray-200 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!title) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Xでシェアするぜ
                </a>
                
                <a
                  href={title ? lineShareUrl : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    title 
                      ? "text-white bg-[#06C755] hover:bg-[#05b54c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06C755]" 
                      : "text-gray-400 bg-gray-200 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!title) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.95 15.92C16.51 16.56 15.68 17.34 14.7 17.51C14.36 17.57 14.08 17.53 13.84 17.45C13.61 17.37 13.42 17.25 13.26 17.13C13.02 16.95 12.33 16.46 11.65 16.01C10.92 15.54 10.21 14.95 9.59 14.25C9.17 13.77 8.8 13.26 8.5 12.74C8.19 12.21 7.97 11.67 7.86 11.15C7.76 10.66 7.79 10.21 7.93 9.82C8.05 9.47 8.25 9.19 8.46 8.97C8.66 8.76 8.87 8.64 9.05 8.57C9.22 8.5 9.37 8.5 9.5 8.5C9.63 8.5 9.77 8.5 9.89 8.51C10.01 8.52 10.16 8.47 10.3 8.91C10.45 9.35 10.9 10.47 10.96 10.62C11.03 10.77 11.07 10.93 10.97 11.11C10.88 11.3 10.83 11.41 10.69 11.58C10.55 11.75 10.39 11.96 10.27 12.08C10.14 12.21 10.01 12.35 10.16 12.62C10.31 12.89 10.87 13.8 11.72 14.56C12.78 15.51 13.64 15.82 13.96 15.95C14.28 16.08 14.45 16.06 14.61 15.88C14.78 15.7 15.3 15.07 15.49 14.8C15.68 14.53 15.87 14.57 16.12 14.66C16.37 14.75 17.49 15.31 17.76 15.44C18.03 15.57 18.2 15.64 18.27 15.75C18.34 15.86 18.34 16.43 17.9 16.92L16.95 15.92Z" />
                  </svg>
                  LINEでシェアするぜ
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">プレビュー</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg bg-gray-100">
              {!title ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">タイトルを入力するとプレビューが表示されます</p>
                </div>
              ) : isPreviewLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">読み込み中...</p>
                </div>
              ) : ogImageUrl ? (
                <Image
                  src={ogImageUrl}
                  alt="OGP画像プレビュー"
                  className="w-full h-full object-cover"
                  fill
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">画像の生成に失敗しました</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; TKG
      </div>
    </div>
  );
}

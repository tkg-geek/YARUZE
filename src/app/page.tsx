'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { debounce } from 'lodash';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [twitterShareUrl, setTwitterShareUrl] = useState('');
  const [lineShareUrl, setLineShareUrl] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // デバウンスされたOGP画像URL生成関数
  const generateOgImageUrl = useCallback(
    debounce((currentTitle: string, currentDescription: string) => {
      if (!currentTitle) {
        setOgImageUrl('');
        setTwitterShareUrl('');
        setLineShareUrl('');
        return;
      }

      const params = new URLSearchParams();
      params.append('title', currentTitle);
      if (currentDescription) {
        params.append('description', currentDescription);
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
      shareUrlParams.append('title', currentTitle);
      if (currentDescription) {
        shareUrlParams.append('description', currentDescription);
      }
      const fullShareUrl = `${window.location.origin}/share?${shareUrlParams.toString()}`;
      const encodedShareUrl = encodeURIComponent(fullShareUrl);
      
      // X（Twitter）共有URL
      const shareText = encodeURIComponent(`${currentTitle}\n\n#YARUZE`);
      setTwitterShareUrl(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedShareUrl}`);
      
      // LINE共有URL
      setLineShareUrl(`https://social-plugins.line.me/lineit/share?url=${encodedShareUrl}`);
    }, 500), // 500ミリ秒の遅延
    [setOgImageUrl, setTwitterShareUrl, setLineShareUrl, setIsPreviewLoading] // 依存関係を明示的に指定
  );

  // タイトルまたは説明が変更されたときにデバウンスされた関数を呼び出す
  useEffect(() => {
    generateOgImageUrl(title, description);
    
    // コンポーネントのアンマウント時にデバウンス関数をキャンセル
    return () => {
      generateOgImageUrl.cancel();
    };
  }, [title, description, generateOgImageUrl]);

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
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white text-gray-900"
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
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white text-gray-900"
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
                  Xで宣言だぜ
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
                    <path d="M22 10.6c0-4.1-4.1-7.5-9.2-7.5-5.1 0-9.2 3.4-9.2 7.5 0 3.7 3.3 6.8 7.8 7.4.3.1.7.2.8.5.1.3 0 .7 0 .9l-.1.6c0 .2-.2.8.7.4s4.6-2.7 6.3-4.6c1.2-1.2 1.9-2.5 1.9-4.2z" />
                  </svg>
                  LINEで宣言だぜ
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

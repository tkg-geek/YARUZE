import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// 動的メタデータを生成
export async function generateMetadata({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  // URLパラメータからタイトルと説明文を取得
  const title = typeof searchParams.title === 'string' ? searchParams.title : 'YARUZE';
  const description = typeof searchParams.description === 'string' ? searchParams.description : '';
  
  // OGP画像のURLを生成
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
    
  const params = new URLSearchParams();
  params.append('title', title);
  if (description) {
    params.append('description', description);
  }
  
  const ogImageUrl = `${baseUrl}/api/og?${params.toString()}`;
  
  return {
    title: title || 'YARUZE - これからやること宣言',
    description: description || 'これからやることを宣言して、SNSでシェアしよう',
    openGraph: {
      title: title || 'YARUZE - これからやること宣言',
      description: description || 'これからやることを宣言して、SNSでシェアしよう',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || 'YARUZE - これからやること宣言',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'YARUZE - これからやること宣言',
      description: description || 'これからやることを宣言して、SNSでシェアしよう',
      images: [ogImageUrl],
    },
  };
}

export default function SharePage({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // URLパラメータからタイトルと説明文を取得
  const title = typeof searchParams.title === 'string' ? searchParams.title : '';
  const description = typeof searchParams.description === 'string' ? searchParams.description : '';
  
  // タイトルがない場合はトップページにリダイレクト
  if (!title) {
    redirect('/');
  }
  
  // OGP画像のURLを生成
  const params = new URLSearchParams();
  params.append('title', title);
  if (description) {
    params.append('description', description);
  }
  
  const ogImageUrl = `/api/og?${params.toString()}`;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            YARUZE！
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            これからやることを宣言して、SNSでシェアしよう
          </p>
        </div>
        
        <div className="bg-white shadow overflow-hidden rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-gray-700 mb-6">{description}</p>
          )}
          
          <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg bg-gray-100 mb-6">
            <img
              src={ogImageUrl}
              alt="OGP画像プレビュー"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
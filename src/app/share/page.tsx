import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 動的メタデータを生成
export async function generateMetadata(props: { 
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  // URLパラメータからタイトルと説明文、進捗率を取得
  const searchParams = await props.searchParams;
  const title = typeof searchParams.title === 'string' ? searchParams.title : 'YARUZE';
  const description = typeof searchParams.description === 'string' ? searchParams.description : '';
  const progress = typeof searchParams.progress === 'string' ? searchParams.progress : '';
  
  // OGP画像のURLを生成
  const params = new URLSearchParams();
  params.append('title', title);
  if (description) {
    params.append('description', description);
  }
  if (progress) {
    params.append('progress', progress);
  }
  
  return {
    title: title || 'YARUZE - これからやること宣言',
    description: description || 'これからやることを宣言して、SNSでシェアしよう',
    openGraph: {
      title: title || 'YARUZE - これからやること宣言',
      description: description || 'これからやることを宣言して、SNSでシェアしよう',
      type: 'website',
      images: [
        {
          url: `/api/og?${params.toString()}`,
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
      images: [`/api/og?${params.toString()}`],
    },
  };
}

export default async function SharePage(props: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // URLパラメータからタイトルと説明文、進捗率を取得
  const searchParams = await props.searchParams;
  const title = typeof searchParams.title === 'string' ? searchParams.title : '';
  const description = typeof searchParams.description === 'string' ? searchParams.description : '';
  const progress = typeof searchParams.progress === 'string' ? searchParams.progress : '';
  
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
  if (progress) {
    params.append('progress', progress);
  }
  
  const ogImageUrl = `/api/og?${params.toString()}`;
  
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
        
        <div className="bg-white shadow overflow-hidden rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-gray-700 mb-4">{description}</p>
          )}
          {progress && (
            <p className="text-gray-700 font-semibold mb-6">進捗率: {progress}</p>
          )}
          
          <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg bg-gray-100 mb-6">
            <Image
              src={ogImageUrl}
              alt="OGP画像プレビュー"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              俺もやるぜ？
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; TKG
      </div>
    </div>
  );
} 
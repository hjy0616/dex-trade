"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footers() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 리소스 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Markets
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 생태계 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Ecosystem</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Labs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Foundation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Operations subDAO
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Grants subDAO
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          {/* 마켓 페이지 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Market Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ETH-USD
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  BTC-USD
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  SOL-USD
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ARB-USD
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  DOGE-USD
                </Link>
              </li>
            </ul>
          </div>

          {/* 더 알아보기 섹션 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Learn More</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How To Start Trading
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trading Competition
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Annual Report
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Token
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {/* 소셜 미디어 링크 */}
          <div className="flex space-x-5">
            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          {/* 저작권 및 면책 정보 */}
          <div className="pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4">
              © {new Date().getFullYear()} Web3 DApp. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground max-w-4xl">
              Web3 DApp은 탈중앙화되고, 중개자가 없으며, 허가가 필요하지 않은 프로토콜이며, 특정 제한된 지역에서는 사용할 수 없습니다. Web3 DApp Foundation은 블록체인 인프라의 구성 요소 운영에 참여하거나 운영하지 않습니다.
            </p>
            <p className="text-xs text-muted-foreground mt-4 max-w-4xl">
              이 웹사이트의 어떠한 내용도 법적, 금융적, 세금 또는 기타 조언으로 사용하거나 간주해서는 안 되며, 어떤 방식으로든 행동하라는 지시나 초대로 해석해서는 안 됩니다. 암호화폐 자산은 변동성이 높고 손실 위험이 있으므로 암호화폐 관련 활동에 참여하기 전에 자체 조사와 실사를 수행해야 합니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
# 🚀 Vercel 배포 가이드

## 📋 배포 전 체크리스트

- ✅ GitHub 저장소 준비됨: https://github.com/hun-cloud/vibe-christmas-letter.git
- ✅ 코드 커밋 필요
- ✅ Vercel 계정 필요

---

## 🎯 배포 방법 (3단계)

### 1단계: GitHub에 코드 푸시

```bash
# 변경사항 커밋
git add .
git commit -m "Add Christmas Letter App with OG image support"

# GitHub에 푸시
git push -u origin master
```

### 2단계: Vercel 배포

#### 옵션 A: Vercel 웹사이트 사용 (추천)

1. **Vercel 접속**
   - https://vercel.com 방문
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 연동 (처음이면 권한 승인)
   - `hun-cloud/vibe-christmas-letter` 선택

3. **프로젝트 설정**
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `.` (기본값)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)

4. **환경 변수 설정** (선택사항)
   ```
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```
   (배포 후 실제 URL로 업데이트 가능)

5. **Deploy 클릭!** 🎉

#### 옵션 B: Vercel CLI 사용

```bash
# Vercel CLI 설치 (전역)
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 3단계: 배포 완료 확인

배포가 완료되면 Vercel이 URL을 제공합니다:
- 예: `https://vibe-christmas-letter.vercel.app`

---

## 🔧 배포 후 설정

### 환경 변수 업데이트 (선택사항)

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 추가:
   ```
   NEXT_PUBLIC_BASE_URL=https://vibe-christmas-letter.vercel.app
   ```
4. Redeploy (Deployments → ... → Redeploy)

---

## ✅ 테스트 방법

### 1. 웹사이트 접속
```
https://vibe-christmas-letter.vercel.app
```

### 2. 편지 작성 테스트
- 받는 사람: 철수
- 보내는 사람: 영희
- 메시지: 메리 크리스마스!
- "링크 생성하기" 클릭

### 3. 카카오톡 공유 테스트
- 생성된 링크 복사
- 카카오톡에 붙여넣기
- 미리보기 이미지 확인 ✨

---

## 🎄 주요 기능

- ✅ 크리스마스 편지 작성
- ✅ URL로 편지 공유
- ✅ 카카오톡 미리보기 이미지
- ✅ 눈 내리는 애니메이션
- ✅ 반응형 디자인

---

## 🔄 자동 배포

GitHub에 푸시할 때마다 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update design"
git push
```

Vercel이 자동으로 감지하고 배포! 🚀

---

## 📱 도메인 설정 (선택사항)

Vercel 대시보드에서:
1. Settings → Domains
2. 원하는 도메인 추가
3. DNS 설정 (Vercel 가이드 따라하기)

---

## 🆘 문제 해결

### 배포 실패시
1. Vercel 대시보드 → Deployments → 실패한 배포 클릭
2. Build Logs 확인
3. 에러 메시지 확인

### 일반적인 문제
- **Node.js 버전**: package.json에 명시
- **환경 변수**: Vercel 설정에서 확인
- **빌드 에러**: 로컬에서 `npm run build` 테스트

---

## 📞 지원

문제가 있으면:
- Vercel 문서: https://vercel.com/docs
- GitHub Issues: https://github.com/hun-cloud/vibe-christmas-letter/issues

---

Made with ❤️ for Christmas 🎄


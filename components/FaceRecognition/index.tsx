'use client'
import { collaboratorFaceRecognition } from '@/services/Collaborator'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react'

type WebcamCaptureProps = {}

const WebcamCapture = forwardRef((props: WebcamCaptureProps, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [result, setResult] = useState<{ error?: string } | any | null>(null)
  const [ringKey, setRingKey] = useState<number>(0)
  const [collaborator, setCollaborator] = useState<string | null>(null)

  const startWebcam = async () => {
    if (!videoRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      videoRef.current.srcObject = stream

      await videoRef.current.play().catch(err => {
        if (err.name !== 'AbortError') console.error(err)
      })
    } catch (err) {
      console.error('Erro ao iniciar a webcam:', err)
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      streamRef.current = null
    }
  }

  const captureFrame = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg')
    setPhoto(dataUrl)
    setRingKey(Date.now())

    if (!dataUrl) return

    setResult(null)

    try {
      const faceRecognitionResult = await collaboratorFaceRecognition(dataUrl)
      if (faceRecognitionResult && faceRecognitionResult.status === 200) {
        setResult(faceRecognitionResult.data)

        if (faceRecognitionResult.data.uuid) {
          setCollaborator(faceRecognitionResult.data.uuid)
          stopWebcam()
        }
      } else {
        setResult(null)
      }
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const processPicture = () => {
    captureFrame()
  }

  useImperativeHandle(ref, () => ({
    stopWebcam,
  }))

  useEffect(() => {
    startWebcam()
    const interval = setInterval(processPicture, 5000)

    return () => {
      clearInterval(interval)
      stopWebcam()
    }
  }, [])

  return (
    <div className='w-full h-full min-h-96'>
      <div className='relative w-full h-full min-h-96 max-h-96'>
        <div
          className={`h-full absolute inset-0 pointer-events-none z-50 top-0 bg-[--backgroundPrimary] rounded-3xl`}
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 17% 40% at 50% 50%, transparent 100%, black 100%)',
            maskImage:
              'radial-gradient(ellipse 17% 40% at 50% 50%, transparent 100%, black 100%)',
          }}
        />
        <div
          className='z-50 absolute pointer-events-none'
          style={{
            width: '34%',
            height: '80%',
            top: '10%',
            left: '33%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!collaborator && (
            <svg
              key={ringKey}
              viewBox='0 0 100 150'
              preserveAspectRatio='none'
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
              className='z-50 progress-svg'
              aria-hidden
            >
              <ellipse
                cx='50'
                cy='75'
                rx='75'
                ry='50'
                fill='none'
                stroke='var(--primaryColor)'
                strokeWidth='4'
                pathLength='100'
              />
            </svg>
          )}

          <svg
            viewBox='0 0 100 150'
            preserveAspectRatio='none'
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
            className='absolute'
            aria-hidden
          >
            <ellipse
              cx='50'
              cy='75'
              rx='50'
              ry='75'
              fill='none'
              className='stroke-[--border]'
              strokeWidth='4'
              pathLength='100'
            />
          </svg>
        </div>
        <div>
          {!collaborator && (
            <video
              ref={videoRef}
              autoPlay
              style={{ transform: 'scaleX(-1)' }}
              className='rounded-3xl w-full h-full max-h-96'
            />
          )}
        </div>
        {collaborator && (
          <div className='z-50 bg-[--backgroundSecondary] rounded-full w-full h-96'></div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: 'none' }}
      />
      {/* {photo && (
        <div>
          <h3>Foto Capturada:</h3>
          <img
            src={photo}
            alt='capturada'
            style={{ width: 320, height: 240 }}
          />
        </div>
      )} */}
      {/* <button onClick={startWebcam}>Abrir Webcam</button>
      <button onClick={captureFrame}>Capturar Foto</button> */}
      {/* <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: 'none' }}
      /> */}
      {/* 
      {result && (
        <div>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )} */}
    </div>
  )
})

export default WebcamCapture

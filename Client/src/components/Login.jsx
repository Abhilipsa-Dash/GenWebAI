import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../Firebase"
import axios from "axios"
import { serverUrl } from "../App"

function Login({ open, onClose }) {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleGoogleAuth = async () => {
    if (loading) return
    setLoading(true)
    setErrorMsg("")

    try {
      const result = await signInWithPopup(auth, provider)
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL
        },
        { withCredentials: true }
      )
      console.log(data)
      onClose?.()
    } catch (error) {
      if (
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        setErrorMsg("Sign-in popup was closed before completing.")
      } else {
        console.log(error)
        setErrorMsg("Google sign-in failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && onClose?.()}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.88 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_40px_123px_rgba(0,0,0,0)] overflow-hidden">
              <motion.div
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-33 left-33 w-80 h-80 bg-purple-500/30 blur-[150px]"
              />

              <button
                type="button"
                disabled={loading}
                className="absolute top-5 right-5 z-20 text-zinc-400 hover:text-white disabled:opacity-40 transition text-lg"
                onClick={onClose}
              >
                X
              </button>

              <div className="relative px-8 pt-14 pb-10 text-center">
                <h1 className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                  AI_Powered website builder
                </h1>

                <h2 className="text-3xl font-semibold leading-tight mb-3 space-x-2">
                  <span>Welcome to</span>
                  <span className="bg-linear-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                    GenWeb.ai
                  </span>
                </h2>

                {errorMsg && (
                  <p className="mb-4 text-xs text-red-400">{errorMsg}</p>
                )}

                <motion.button
                  type="button"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.05 }}
                  whileTap={loading ? {} : { scale: 0.96 }}
                  onClick={handleGoogleAuth}
                  className="group relative w-full h-13 rounded-full bg-white text-black font-semibold shadow-2xl overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white opacity-0 group-hover:opacity-100 transition" />
                  <div className="relative flex items-center justify-center gap-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSO-bBjvoloR3hOQae1iNZxwC1Qmuo6QvTYt3NWJbjA&s=10"
                      alt="Google"
                      className="h-12 w-12"
                    />
                    {loading ? "Signing in..." : "Continue with Google"}
                  </div>
                </motion.button>

                <div className="flex items-center gap-4 my-10">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-s text-zinc-500 tracking-wide">
                    Secure Login
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <span className="underline cursor-pointer hover:text-zinc-300">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer hover:text-zinc-300">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Login
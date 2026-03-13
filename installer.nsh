!macro customInit
  ; Forzar la instalación en AppData/Roaming/StormGamesStudios/Programs
  StrCpy $INSTDIR "$APPDATA\StormGamesStudios\Programs\MultiAI"
!macroend

!macro customInstall
  ; CreateShortCut "$DESKTOP\MultiAI - CardinalAI.lnk" "$INSTDIR\MultiAI.exe" "--cardinal" "$INSTDIR\resources\icons\cardinalai.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - ChatGPT.lnk" "$INSTDIR\MultiAI.exe" "--chatgpt" "$INSTDIR\resources\icons\chatgpt.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Claude.lnk" "$INSTDIR\MultiAI.exe" "--claude" "$INSTDIR\resources\icons\claude.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Copilot.lnk" "$INSTDIR\MultiAI.exe" "--copilot" "$INSTDIR\resources\icons\copilot.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Deepseek.lnk" "$INSTDIR\MultiAI.exe" "--deepseek" "$INSTDIR\resources\icons\deepseek.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Gemini.lnk" "$INSTDIR\MultiAI.exe" "--gemini" "$INSTDIR\resources\icons\gemini.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Grok.lnk" "$INSTDIR\MultiAI.exe" "--grok" "$INSTDIR\resources\icons\grok.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Mistral.lnk" "$INSTDIR\MultiAI.exe" "--mistral" "$INSTDIR\resources\icons\mistral.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - NotebookLM.lnk" "$INSTDIR\MultiAI.exe" "--notebooklm" "$INSTDIR\resources\icons\notebooklm.ico"
  ; CreateShortCut "$DESKTOP\MultiAI - Perplexity.lnk" "$INSTDIR\MultiAI.exe" "--perplexity" "$INSTDIR\resources\icons\perplexity.ico"

  ; Accesos directos en el Menú de Inicio (Carpeta MultiAI)
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - CardinalAI.lnk" "$INSTDIR\MultiAI.exe" "--cardinal" "$INSTDIR\resources\icons\cardinalai.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - ChatGPT.lnk" "$INSTDIR\MultiAI.exe" "--chatgpt" "$INSTDIR\resources\icons\chatgpt.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Claude.lnk" "$INSTDIR\MultiAI.exe" "--claude" "$INSTDIR\resources\icons\claude.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Copilot.lnk" "$INSTDIR\MultiAI.exe" "--copilot" "$INSTDIR\resources\icons\copilot.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Deepseek.lnk" "$INSTDIR\MultiAI.exe" "--deepseek" "$INSTDIR\resources\icons\deepseek.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Gemini.lnk" "$INSTDIR\MultiAI.exe" "--gemini" "$INSTDIR\resources\icons\gemini.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Grok.lnk" "$INSTDIR\MultiAI.exe" "--grok" "$INSTDIR\resources\icons\grok.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Mistral.lnk" "$INSTDIR\MultiAI.exe" "--mistral" "$INSTDIR\resources\icons\mistral.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - NotebookLM.lnk" "$INSTDIR\MultiAI.exe" "--notebooklm" "$INSTDIR\resources\icons\notebooklm.ico"
  ; CreateShortCut "$SMPROGRAMS\MultiAI\MultiAI - Perplexity.lnk" "$INSTDIR\MultiAI.exe" "--perplexity" "$INSTDIR\resources\icons\perplexity.ico"
!macroend

!macro customUnInstall
  ; Delete "$DESKTOP\MultiAI - CardinalAI.lnk"
  ; Delete "$DESKTOP\MultiAI - ChatGPT.lnk"
  ; Delete "$DESKTOP\MultiAI - Claude.lnk"
  ; Delete "$DESKTOP\MultiAI - Copilot.lnk"
  ; Delete "$DESKTOP\MultiAI - Deepseek.lnk"
  ; Delete "$DESKTOP\MultiAI - Gemini.lnk"
  ; Delete "$DESKTOP\MultiAI - Grok.lnk"
  ; Delete "$DESKTOP\MultiAI - Mistral.lnk"
  ; Delete "$DESKTOP\MultiAI - NotebookLM.lnk"
  ; Delete "$DESKTOP\MultiAI - Perplexity.lnk"

  ; Eliminar accesos directos del Menú de Inicio
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - CardinalAI.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - ChatGPT.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Claude.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Copilot.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Deepseek.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Gemini.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Grok.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Mistral.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - NotebookLM.lnk"
  ; Delete "$SMPROGRAMS\MultiAI\MultiAI - Perplexity.lnk"
!macroend
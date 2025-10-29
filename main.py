from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import io, qrcode

app=FastAPI(title="CrateJuice Backend")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"ok":True,"mode":"memory"}

@app.get("/qr.png")
def qr(u:str,s:int=512):
    img=qrcode.make(u).resize((s,s))
    bio=io.BytesIO(); img.save(bio,format="PNG")
    return Response(bio.getvalue(), media_type="image/png")

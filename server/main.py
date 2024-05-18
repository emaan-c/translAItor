from fastapi import FastAPI, File, UploadFile
from translation import translation
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    file_location = f"videos/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    videoTranslated = translation()
    print(JSONResponse(status_code=200, content={"result": videoTranslated}))
    return JSONResponse(status_code=200, content={"result": videoTranslated})

## display server result in frontend
## Make server process efficient
## incorperate live video feed
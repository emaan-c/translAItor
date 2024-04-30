.PHONY: all server client kill

all: kill server client

server:
	@echo "Starting FastAPI server..."
	@cd server && uvicorn main:app --reload &

client:
	@echo "Starting React client..."
	@cd client && npm start &

kill:
	@echo "Stopping any existing node servers..."
	@-pkill -f uvicorn
	@-pkill -f node



# .PHONY: all server client

# all: server client

# server:
# 	@echo "Starting FastAPI server..."
# 	@cd server && uvicorn main:app --reload

# client:
# 	@echo "Starting React client..."
# 	@cd client && npm start
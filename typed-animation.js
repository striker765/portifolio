document.addEventListener('DOMContentLoaded', function () {
    var lines = [
        'package main\n',
        '\n',
        'import (\n',
        '    "encoding/json"\n',
        '    "net/http"\n',
        '    "github.com/gorilla/mux"\n',
        '    "strconv"\n',
        ')\n',
        '\n',
        'var items = make(map[int]string)\n',
        'var idCounter = 1\n',
        '\n',
        'func getItems(w http.ResponseWriter, r *http.Request) {\n',
        '    w.Header().Set("Content-Type", "application/json")\n',
        '    var result []struct {\n',
        '        ID   int    `json:"id"`\n',
        '        Name string `json:"name"`\n',
        '    }\n',
        '    for id, name := range items {\n',
        '        result = append(result, struct {\n',
        '            ID   int    `json:"id"`\n',
        '            Name string `json:"name"`\n',
        '        }{ID: id, Name: name})\n',
        '    }\n',
        '    json.NewEncoder(w).Encode(result)\n',
        '}\n',
        '\n',
        'func getItem(w http.ResponseWriter, r *http.Request) {\n',
        '    w.Header().Set("Content-Type", "application/json")\n',
        '    params := mux.Vars(r)\n',
        '    id, _ := strconv.Atoi(params["id"])\n',
        '    if name, exists := items[id]; exists {\n',
        '        json.NewEncoder(w).Encode(struct {\n',
        '            ID   int    `json:"id"`\n',
        '            Name string `json:"name"`\n',
        '        }{ID: id, Name: name})\n',
        '    } else {\n',
        '        http.Error(w, "Item not found", http.StatusNotFound)\n',
        '    }\n',
        '}\n',
        '\n',
        'func createItem(w http.ResponseWriter, r *http.Request) {\n',
        '    w.Header().Set("Content-Type", "application/json")\n',
        '    var item struct {\n',
        '        Name string `json:"name"`\n',
        '    }\n',
        '    if err := json.NewDecoder(r.Body).Decode(&item); err != nil {\n',
        '        http.Error(w, err.Error(), http.StatusBadRequest)\n',
        '        return\n',
        '    }\n',
        '    id := idCounter\n',
        '    idCounter++\n',
        '    items[id] = item.Name\n',
        '    json.NewEncoder(w).Encode(struct {\n',
        '        ID   int    `json:"id"`\n',
        '        Name string `json:"name"`\n',
        '    }{ID: id, Name: item.Name})\n',
        '}\n',
        '\n',
        'func updateItem(w http.ResponseWriter, r *http.Request) {\n',
        '    w.Header().Set("Content-Type", "application/json")\n',
        '    params := mux.Vars(r)\n',
        '    id, _ := strconv.Atoi(params["id"])\n',
        '    if _, exists := items[id]; exists {\n',
        '        var item struct {\n',
        '            Name string `json:"name"`\n',
        '        }\n',
        '        if err := json.NewDecoder(r.Body).Decode(&item); err != nil {\n',
        '            http.Error(w, err.Error(), http.StatusBadRequest)\n',
        '            return\n',
        '        }\n',
        '        items[id] = item.Name\n',
        '        json.NewEncoder(w).Encode(struct {\n',
        '            ID   int    `json:"id"`\n',
        '            Name string `json:"name"`\n',
        '        }{ID: id, Name: item.Name})\n',
        '    } else {\n',
        '        http.Error(w, "Item not found", http.StatusNotFound)\n',
        '    }\n',
        '}\n',
        '\n',
        'func deleteItem(w http.ResponseWriter, r *http.Request) {\n',
        '    params := mux.Vars(r)\n',
        '    id, _ := strconv.Atoi(params["id"])\n',
        '    if _, exists := items[id]; exists {\n',
        '        delete(items, id)\n',
        '        w.WriteHeader(http.StatusNoContent)\n',
        '    } else {\n',
        '        http.Error(w, "Item not found", http.StatusNotFound)\n',
        '    }\n',
        '}\n',
        '\n',
        'func main() {\n',
        '    r := mux.NewRouter()\n',
        '    r.HandleFunc("/items", getItems).Methods("GET")\n',
        '    r.HandleFunc("/items/{id:[0-9]+}", getItem).Methods("GET")\n',
        '    r.HandleFunc("/items", createItem).Methods("POST")\n',
        '    r.HandleFunc("/items/{id:[0-9]+}", updateItem).Methods("PUT")\n',
        '    r.HandleFunc("/items/{id:[0-9]+}", deleteItem).Methods("DELETE")\n',
        '\n',
        '    http.ListenAndServe(":8080", r)\n',
        '}\n'
    ];






    
    var currentLine = 0;
    var terminalContent = document.getElementById('terminal-content');
    var maxHeight = 300; // Defina o limite de altura do terminal
    
    

    function typeLine(line, callback) {
        terminalContent.innerHTML += line + '<br>';
        new Typed(terminalContent.lastChild, {
            strings: [line],
            typeSpeed: 50,
            backSpeed: 0,
            startDelay: 500,
            showCursor: true,
            loop: false,
            contentType: 'text',
            onComplete: callback
        });
    }

    function typeNextLine() {
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], function () {
                currentLine++;
                checkOverflow();
                setTimeout(typeNextLine, 500); // Atraso antes de digitar a próxima linha
            });
        } else {
            // Reinicia o processo após uma breve pausa
            setTimeout(function () {
                currentLine = 0;
                terminalContent.innerHTML = '';
                typeNextLine();
            }, 1500);
        }
    }

    function checkOverflow() {
        if (terminalContent.scrollHeight > maxHeight) {
            terminalContent.innerHTML = ''; // Limpa o conteúdo quando exceder o limite
        }
    }

    typeNextLine();
});



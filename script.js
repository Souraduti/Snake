const direction = [0,1];
const head = [4,4];
const fruit = [-1,-1];
const snake = [[4,4],[4,3],[4,2]];
const timespan = 400;

let game_running = false;
let timeid;
let score = 0;
let score_id = document.getElementById("score");

function get_id_from_arr(arr){
    let s = "_"+arr[0]+"-"+arr[1];
    return s;
}
function is_gameover(){
    /* out of field */
    if(head[0]<0||head[0]>=10) return true;
    if(head[1]<0||head[1]>=20) return true;

    /* Eating itself */
    for(let i=1;i<snake.length;i++){
        if(head[0]==snake[i][0]&&head[1]==snake[i][1]) return true;
    }
    return false;
}
function move_snake(){
    head[0]+=direction[0];
    head[1]+=direction[1];
    if(is_gameover()){
        score_id.innerText="Game Over :: Score :  "+score;
        clearInterval(timeid);
        setTimeout(reset,2000);
        return;
    }
    if(head[0]==fruit[0]&&head[1]==fruit[1]){
        /* Eating Fruit */
        update_score();
        generate_fruit();
    }else{
        change_color(snake.pop(),0);
    }
    change_color(head,1);
    snake.unshift([head[0],head[1]]);
}
function change_direction(dir){
    if(dir[0]==(-1)*direction[0]&&dir[1]==(-1)*direction[1]){
        return;
    }
    direction[0] = dir[0];
    direction[1] = dir[1];
}
function generate_fruit(){
    let cell = [0,0];
    let flag = true;
    while(flag){
        cell[0] = Math.floor(Math.random()*10);
        cell[1] = Math.floor(Math.random()*20);
        flag = false;
        for(let i=0;i<snake.length;i++){
            if(cell[0]==snake[i][0]&&cell[1]==snake[i][1]){
                flag = true;
                break;
            }
        }   
    }
    fruit[0] = cell[0];
    fruit[1] = cell[1];
    change_color(cell,2);
}
function change_color(cell,code){
    let id = get_id_from_arr(cell);
    /* field */
    let color = "rgb(90, 210, 100)"; 
    if(code == 1){
        /* snake*/
        color = "green";
    }else if(code == 2){
        /*fruit*/
        color = "red";
    }
    document.getElementById(id).style.backgroundColor=color;
}
function update_score(){
    score+=10;
    score_id.innerText = "Score :  "+score;
}

function key_pressed(e){
    if(!window.Event){
        return;
    }
    switch(String.fromCharCode(e.keyCode)){
        case "s":
            if(game_running) return;
            game_running = true;
            generate_fruit();
            timeid = setInterval(move_snake,timespan);
            break;
        case "x":
            if(!game_running) return;
            clearInterval(timeid);
            reset();
            break;
        case "i":
            if(!game_running) return;
            change_direction([-1,0]);
            break;
        case "j":
            if(!game_running) return;
            change_direction([0,-1]);
            break;
        case "k":
            if(!game_running) return;
            change_direction([1,0]);
            break;
        case "l":
            if(!game_running) return;
            change_direction([0,1]);
            break;
    }
}

function reset(){
    game_running = false;
    score_id.innerText = "Snake";
    change_color(fruit,0);
    score = 0;
    while(snake.length!=0){
        change_color(snake.pop(),0);
    }
    head[0] = 4;
    head[1] = 4;

    direction[0] = 0;
    direction[1] = 1;

    snake.push([4,4]);
    snake.push([4,3]);
    snake.push([4,2]);
}


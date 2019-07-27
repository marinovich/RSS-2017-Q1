class Stack{
    constructor(){
        this.array = [];
    }
    push(data){
        this.array.push(data);
    }
    pop(){
        this.array.length--;
        return this.array[this.array.length-1];
    }
    peek(){
        return this.array[this.array.length-1];
    } 
    clear(){
        this.array.length = 0;
    }
}

class FSM {
    constructor(config) {
    	this.state = config.initial;
    	this.config = config;
    	this.stackRedo = new Stack();
    	this.history = new Stack();
   		this.history.push(this.state);
   		this.enabledRedo = true;
    }

    getState() {
    	return this.state;
    }

    changeState(state) {
    	if (state in this.config.states){
    			this.state = state;
    			this.history.push(this.state);
    			this.enabledRedo = false;
    			return true;
    		}
    	throw TypeError();
    }

    trigger(event) {
    	if (this.config.states[this.state].transitions[event] !== undefined)
    		this.changeState(this.config.states[this.state].transitions[event]);
    	else
    		throw TypeError();
    }

    reset() {
    	this.history.clear();
    	this.changeState(this.config.initial);
    }

    getStates(event) {
    	var result = [];
    	var keys = Object.keys(this.config.states); 
		for(var i = 0; i < keys.length; i++)
			if (this.config.states[keys[i]].transitions[event] !=null || event == null) 
				result.push(keys[i]); 
		return result;
    }

    undo() {
    	if (this.history.array.length == 1)
    		return false;  
    	this.stackRedo.push(this.history.peek());  	
    	this.state = this.history.pop();
    	this.enabledRedo = true;
    	if (this.state != null)
    		return true;
    	else
    		return false;
    }

    redo() {
    	if (this.stackRedo.array.length == 0 || !this.enabledRedo)
    		return false;   
    	this.history.push(this.stackRedo.peek());
    	this.state = this.history.peek();
    	this.stackRedo.pop();
    	if (this.state != null)
    		return true;
    	else
    		return false;
    }

    clearHistory() {
    	this.history.clear();
    	this.stackRedo.clear();
    	this.history.push(this.config.initial);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

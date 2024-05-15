---
title: "Sequential vs. Concurrent Programming"
description: Exploring the performance difference between concurrent and sequencial programs.
category: Interesting
pubDate: 'May 13 2024'
---

# Sequential vs. Concurrent Programming: Understanding Their Impact on Performance Using Java

A few weeks ago, I learned about **Concurrent Programming**. My interest was piqued while studying the <a href="https://en.wikipedia.org/wiki/Functional_programming" target="blank">functional programming</a> paradigm and how it takes a different perspective on writing programs as opposed to the <a href="https://en.wikipedia.org/wiki/Imperative_programming" target="blank">imperative style</a> I have long known.

I am always blown away when I learn about new perspectives that help shape the way we think about both problems and solutions.

Let’s define some keywords for this journey:

### Concurrent programs

Concurrent programs have multiple **threads** of operation working on different parts of the same data input with the aim of increasing performance and responsiveness for the system.

You can think of it this way: when you have a task to be done and you divide it among your friends and work on it at the same time to finish it faster, that is the concurrent approach.

### Thread

A **thread** is the smallest unit of execution in a computer system. A single task(process) can be broken up into multiple **threads** and each would work on different parts of the same task.

Remember the task you divided among your friends? In that case, each of your friends is a **thread** working on different parts of the task you were assigned 🧵.

### Sequential programs

Sequential programs are single-threaded programs, which means all tasks are executed in a step-by-step manner, and the next task is only executed when the current one is done.

Threads enable us to achieve concurrency/parallelism for a set of tasks in a program. It simply allows for tasks to be executed “at the same time”.

### Parallel Execution

At this point, it is worth noting the difference between parallel execution and concurrent execution.
Technically, **concurrent** tasks are executed at the same time, but not simultaneously. 

Computers normally allocate time-slices to tasks and then context switch between the various tasks to simulate the idea of them being run at the same time (concurrently).

**Parallel execution** happens when a computer with multiple cores executes tasks independently on different cores. In this case, the execution is done simultaneously, and results are obtained faster.

### Why don’t we always use concurrent systems then?

Great question; I am glad you asked that 👍.

Well, we do, most of the time, but as useful as the concurrent approach is, like anything else, if not used in the right place, it may end up costing us more than we were trying to save.

It just so happens that there are scenarios in programming where using the concurrency approach performs lower than using the sequential approach.

This came as a surprise to me at first, so I decided to write a small Java program to explore the reasons behind this phenomenon.

> I believe that one of the hallmarks of a good software engineer (or any engineer in this regard), is analyzing the current situation, choosing the best-fit solution for the problem at hand, and collecting feedback from that. It is not enough for me to know the standards, I have to know when to use or not use the standards.
**- Me**
> 

Let us examine the program below:

```java
// To create a list of 'n' integers each with a value of 1
Function<Integer, List<Integer>> generateIntegers = (n) -> {
    List<Integer> integers = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
        integers.add(1);
    }
    return integers;
};
```

Here, I simply create a function to generate a list of 1s depending on the number (n) you pass to it. 

```java
// To calculate the sum of all integers in the list without concurrency
Consumer<List<Integer>> sumOfIntegersSequentially = (l) ->{
        double total = l.stream()
                .mapToInt(Integer::intValue)
                .sum();
        System.out.printf("Total: %,.2f%n", total);
};
    

 // To calculate the sum of all integers in a list, making use of concurrency
 Consumer<List<Integer>> sumOfIntegersConcurrently = (l) ->{
        double total = l.parallelStream()
                .mapToInt(Integer::intValue)
                .sum();
        System.out.printf("Total: %,.2f%n", total);
 };
```

The two functions above calculate the sum of the numbers in a list passed as an argument.

As you may have noticed, aside from their names, the only difference between the two functions’ implementations is the methods`**stream()**` and `**parallelStream()**`.

The **parallelStream()** method instructs **Java** to use concurrency (multi-threading) for the computation, while **stream()** does the computation sequentially.

```java
// To invoke and output the execution time(ms) of the sum operations
BiConsumer<Consumer<List<Integer>>, List<Integer>> getTimePerformance = (c, list) -> {
	  long startTime = System.currentTimeMillis();
	
	  c.accept(list);
	
	  long endTime = System.currentTimeMillis();
	  long timeTaken = endTime - startTime;
	
	  System.out.printf("Took %dms to complete%n", timeTaken);
};
```

You can think of this function as the referee, it takes in a computation function and a list of numbers.
This function invokes the computation function by passing the list and calculates the execution time for the computation function in milliseconds.

```java
// Set up varying input data
List<Integer> integers40k = generateIntegers.apply(40_000);
List<Integer> integers800k = generateIntegers.apply(800_000);
List<Integer> integers10M = generateIntegers.apply(10_000_000);
List<Integer> integers100M = generateIntegers.apply(100_000_000);
```

Here, I generate some data for the test.

And this is how I output the result: 

```java
// Output
System.out.println();
System.out.println("40k Integers (Sequential)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersSequentially, integers40k);
System.out.println();
System.out.println("40k Integers (Concurrent)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersConcurrently, integers40k);

System.out.println();
System.out.println();

System.out.println("800k Integers (Sequential)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersSequentially, integers800k);
System.out.println();
System.out.println("800k Integers (Concurrent)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersConcurrently, integers800k);

System.out.println();
System.out.println();

System.out.println("10M Integers (Sequential)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersSequentially, integers10M);
System.out.println();
System.out.println("10M Integers (Concurrent)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersConcurrently, integers10M);

System.out.println();
System.out.println();

System.out.println("100M Integers (Sequential)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersSequentially, integers100M);
System.out.println();
System.out.println("100M Integers (Concurrent)");
System.out.println("------------------------------");
getTimePerformance.accept(sumOfIntegersConcurrently, integers100M);
```

## Analyzing the outputs:

Now that you have seen the overview of the code, let us move on to analyze the outputs.
I decided to run the program on two computers with very different specifications:

**Computer A:**
11-core CPU, 18 GiB RAM

**Computer B:**
0.5-core vCPU, 0.5 GiB RAM

As you can see **Computer B** has very limited resources, only half of a CPU core and 0.5 GiB RAM while **Computer A** is the rich guy in this test with a whooping 11-core CPU and 18 GiB RAM.

### **Computer A output:**

11-core CPU, 18 GiB RAM

```
40k Integers (Sequential)
------------------------------
Total: 40,000.00
Took 8ms to complete

40k Integers (Concurrent)
------------------------------
Total: 40,000.00
Took 3ms to complete

800k Integers (Sequential)
------------------------------
Total: 800,000.00
Took 3ms to complete

800k Integers (Concurrent)
------------------------------
Total: 800,000.00
Took 8ms to complete

10M Integers (Sequential)
------------------------------
Total: 10,000,000.00
Took 14ms to complete

10M Integers (Concurrent)
------------------------------
Total: 10,000,000.00
Took 1ms to complete

100M Integers (Sequential)
------------------------------
Total: 100,000,000.00
Took 41ms to complete

100M Integers (Concurrent)
------------------------------
Total: 100,000,000.00
Took 6ms to complete
```

What did you observe as the dataset size increased?

For small data sizes (40k and 800K), the performance difference between the sequential and the concurrent one is not that big, and even sometimes, like with the data size of 800k, the sequential one beats the concurrent one. 
This is because, sometimes, for relatively small datasets, overheads of creating and managing multiple threads become a burden which defeats the purpose of achieving quicker execution time.

For huge data sizes (10M and 100M), the time difference significantly widens and is seen to be consistent across the last two datasets for this on **Computer A**.
Since there is a huge data input and enough resources, it appears the overhead of creating and managing threads is not significant enough to negatively impact the overall operation and therefore concurrency wins (this time).

> 💡 Note: For **Computer B,** I adjusted the sizes of the datasets for the program to avoid overloading the heap memory due to it’s limited resources. 
Don’t worry, this does not incline our test to any bias since we are interested in the time difference between the sequential operation and the concurrent one for each data input.
> 

### **Computer B output:**

0.5-core vCPU, 0.5 GiB RAM

```
40k Integers (Sequential)
------------------------------
Total: 40,000.00
Took 90ms to complete

40k Integers (Concurrent)
------------------------------
Total: 40,000.00
Took 93ms to complete

800k Integers (Sequential)
------------------------------
Total: 800,000.00
Took 20ms to complete

800k Integers (Concurrent)
------------------------------
Total: 800,000.00
Took 181ms to complete

5M Integers (Sequential)
------------------------------
Total: 5,000,000.00
Took 13ms to complete

5M Integers (Concurrent)
------------------------------
Total: 5,000,000.00
Took 88ms to complete

30M Integers (Sequential)
------------------------------
Total: 30,000,000.00
Took 132ms to complete

30M Integers (Concurrent)
------------------------------
Total: 30,000,000.00
Took 367ms to complete
```

What did you observe as the data size increased?

Interestingly, it seems as the data size increased the concurrent one is rather losing the race and at an increasing margin. Throughout the test, the sequential computation wins and continues to win with significant differences in performance for data sizes from 800k to 30M. And because of this, it is safe to assume this may happen in larger data inputs.

So What might be wrong?

Technically speaking, the concurrent program on **Computer B** can not create new threads in **parallel** because there are no other cores unlike in **Computer A**. It rather allocates time slices to the thread processes and context switches between them to achieve concurrency.

Simply put, the system specifications of **Computer B:** having a limited CPU and only half a Gigabyte of RAM, are not enough resources to efficiently create and maintain multiple threads.

### Conclusion

Overall, this analysis proves that it is important to understand the scope of your problem and
consider problem specifications (the data size and system requirements) when choosing/creating solutions (in this case, sequential or concurrent solutions).

For me, this experiment brought me one step closer to understanding how computers actually work and improving my observation sense when it comes to solving problems in different environments.
Initially, the idea that a multi-threaded program would perform worse than a sequential one seemed a bit counter-intuitive, but after exploring the scope of the subject, I got to understand the reasons behind it.

You can click [here](https://github.com/abboahene/threads-performance/blob/main/src/Main.java) to view the source code, don’t forget to star if you like it.
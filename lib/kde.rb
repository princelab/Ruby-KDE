module Stats
  class KDE

  end # KDE

end # module


=begin 
    class T
      
      class << self
        include Math
        # Test the null hypothesis that the population mean is equal to a specified value u, one uses the statistic.
        # Is the same formula used on t-test for paired sample.
        # * <tt>x</tt>: sample/differences mean
        # * <tt>u</tt>: population mean
        # * <tt>s</tt>: sample/differences standard deviation
        # * <tt>n</tt>: sample size
        def one_sample(x,u,s,n)
          (x-u)*Math::sqrt(n).quo(s)
        end

        # Test if means of two samples are different.
        # * <tt>x1</tt>: sample 1 mean
        # * <tt>x2</tt>: sample 2 mean
        # * <tt>s1</tt>: sample 1 standard deviation
        # * <tt>s2</tt>: sample 2 standard deviation
        # * <tt>n1</tt>: sample 1 size
        # * <tt>n2</tt>: sample 2 size
        # * <tt>equal_variance</tt>: true if equal_variance assumed
        #
        def two_sample_independent(x1, x2, s1, s2, n1, n2, equal_variance = false)
          num=x1-x2
          if equal_variance
            sx1x2 = sqrt(((n1-1)*s1**2 + (n2-1)*s2**2).quo(n1+n2-2))
            den   = sx1x2*sqrt(1.quo(n1)+1.quo(n2))
          else
            den=sqrt((s1**2).quo(n1) + (s2**2).quo(n2))
          end
          num.quo(den)
        end






=end 


